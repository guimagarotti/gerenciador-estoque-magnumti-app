import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthChildGuard implements CanActivateChild {


    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        let autorizado = true;

        if (autorizado) {
            return true;
        } else {
            return false;
        }
    }


    constructor() {}
}