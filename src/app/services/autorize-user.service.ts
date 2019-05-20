import { CanActivate, Router } from '@angular/router';
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

    createAccount() {
        console.log(this.newUserEmail + this.newUserPassword);
        return this.afAuth.auth.createUserWithEmailAndPassword(this.newUserEmail, this.newUserPassword)
            .then((result) => {
                window.alert("You have been successfully registered!");
                console.log(result.user)
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    loginWithEmail() {
        return this.afAuth.auth.signInWithEmailAndPassword(this.newUserEmail, this.newUserPassword)
        .then((result) => {
            window.alert("You have been successfully logged in!");
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }

    loginWithGoogle() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    logout() {
        this.afAuth.auth.signOut();
    }

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
