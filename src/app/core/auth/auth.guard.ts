import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {

    private verificaAcesso() {
        return true;
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        return this.verificaAcesso();
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        return this.verificaAcesso();

    }


    constructor(
        private router: Router) {
    }
}