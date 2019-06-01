import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable()

export class AuthorizeUserService /*implements CanActivate*/ {
    private authorizationSource = new Subject<boolean>();

    isAuthorize$ = this.authorizationSource.asObservable();

    uid = this.afAuth.authState.pipe(
        map(authState => {
            if (!authState) {
                return null;
            } else {
                return authState.uid;
            }
        })
    );

    constructor(private _router: Router, private afAuth: AngularFireAuth) {}

    createAccount(createUserForm) {
        return this.afAuth.auth.createUserWithEmailAndPassword(createUserForm.email, createUserForm.passwordGroup.password)
            .then((result) => {
                this.navigateLoggedUser();
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    loginWithEmail(loginCredentials) {
        return this.afAuth.auth.signInWithEmailAndPassword(loginCredentials.login, loginCredentials.password)
        .then((result) => {
            this.navigateLoggedUser('main');
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }

    loginWithGoogle() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        this.navigateLoggedUser();
    }

    loginWithFacebook() {
        this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
        this.navigateLoggedUser();
    }

    logout() {
        this.afAuth.auth.signOut();
        this.uid.subscribe((uid) => {
            if (!uid) {
                this.authorizationSource.next(false);
                this._router.navigate(['login']);
            }
        })
    }

    navigateLoggedUser(route = 'ustawienia-konta') {
        this.uid.subscribe((uid) => {
            if (uid) {
                this.authorizationSource.next(true);
                this._router.navigate([route]);
            }
        })
    }



    // https://dietmotivator-45021.firebaseapp.com/__/auth/handler

    // canActivate() {
    //     // TODO: getting authorized user from firebase
    //     const isUserLogged = true;

    //     if (isUserLogged) {
    //         return true;
    //     } else {
    //         return false;
    //     }

    // }
}
