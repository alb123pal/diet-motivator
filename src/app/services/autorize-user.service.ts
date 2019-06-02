import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFirestore } from "@angular/fire/firestore";
import { UserInfo } from '../models/user-data.model';

@Injectable()

export class AuthorizeUserService /*implements CanActivate*/ {
    private authorizationSource = new Subject<boolean>();

    isAuthorize$ = this.authorizationSource.asObservable();
    userData: UserInfo;
    isFailedLogin = null;

    uid = this.afAuth.authState.pipe(
        map(authState => {
            if (!authState) {
                return null;
            } else {
                return authState.uid;
            }
        })
    );


    constructor(private _router: Router, private afAuth: AngularFireAuth, private fs: AngularFirestore) {}

    createAccount(createUserForm) {
        return this.afAuth.auth.createUserWithEmailAndPassword(createUserForm.email, createUserForm.passwordGroup.password)
            .then((result) => {
                this.navigateLoggedUser();
            })
            .catch((error) => {
                var errorMessage = error.message;
            });
    }

    loginWithEmail(loginCredentials) {
        return this.afAuth.auth.signInWithEmailAndPassword(loginCredentials.login, loginCredentials.password)
        .then((result) => {
            this.isFailedLogin = false;
            this.navigateLoggedUser('main');
        })
        .catch((error) => {
            this.isFailedLogin = true;
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
        this.afAuth.user.subscribe(data => {
            this.userData = {
                id: data.uid,
                name: '',
                surname: '',
                weight: 0,
                height: 0,
                age: 0,
                gender: '',
                currentDiet: '',
                demandKcal: 0,
                BMI: 0,
                userToken: localStorage.getItem('userToken'),
                friendNumber: ''
            }
        this.fs.collection('users', ref => ref.where('id', '==', data.uid)).snapshotChanges().subscribe(e => {
            if(e.length == 0) {
                this.fs.collection('users').add(this.userData);
            } else {
                console.log('user istnieje')
            }
        })
        
        })

        this.uid.subscribe((uid) => {
            if (uid) {
                this.authorizationSource.next(true);
                this._router.navigate([route]);
            }
        });
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
