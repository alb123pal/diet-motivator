import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class AuthorizeUserService implements CanActivate {
    constructor(private _router: Router) {

    }

    canActivate() {
        // TODO: getting authorized user from firebase
        const isUserLogged = true;

        if (isUserLogged) {
            return true;
        } else {
            return false;
        }

    }
}
