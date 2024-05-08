import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthIndisponivelGuard implements CanActivateChild {

    constructor() { }

    canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
        return false;
    }

}