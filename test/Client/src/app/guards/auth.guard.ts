import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { map } from 'rxjs/operators';
import { IJwtToken } from './../models/jwt-token.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._authService.jwtToken.pipe(
      map((jwtToken: IJwtToken) => {
        if(!jwtToken.isAuthenticated)
          this._router.navigate(['/signin'])
        return jwtToken.isAuthenticated
      })
    );
  }
  
}
