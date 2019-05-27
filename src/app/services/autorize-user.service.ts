import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable()

export class AuthorizeUserService /*implements CanActivate*/ {
    newUserEmail: string = '';
    newUserPassword: string = '';

    userEmail: string = '';
    userPassword: string = '';

    uid = this.afAuth.authState.pipe(
        map(authState => {
            if (!authState) {
                return null;
            } else {
                return authState.uid;
            }
        })
    );

    constructor(private _router: Router, private afAuth: AngularFireAuth) {

    }

    createAccount(createUserForm) {
        debugger;
        return this.afAuth.auth.createUserWithEmailAndPassword(createUserForm.login, createUserForm.passwordGroup.password)
            .then((result) => {
                debugger;
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
            this.navigateLoggedUser();
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
                this._router.navigate(['login']);
            }
        })
    }

    navigateLoggedUser() {
        this.uid.subscribe((uid) => {
            if (uid) {
                this._router.navigate(['ustawienia-konta']);
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
