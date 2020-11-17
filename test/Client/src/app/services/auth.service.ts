import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPangolin } from './../models/pangolin.models';
import { IJwtToken } from './../models/jwt-token.models';
import { tap } from 'rxjs/operators';
import api from './../environment/development.js'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentPangolin: BehaviorSubject<IPangolin> = new BehaviorSubject(null)

  public jwtToken: BehaviorSubject<IJwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null
  })

  constructor(private _http: HttpClient) { 
    this._initToken()
  }

  private _initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        token: token
      });
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
    }
  }

  public signup(pangolin: IPangolin):Observable<IPangolin> {
    return this._http.post<IPangolin>(`${api.apiUrl}/auth/signup`, pangolin)
  }


  public signin(credentials): Observable<any> {
    return this._http.post<string>(`${api.apiUrl}/auth/signin`, credentials).pipe(
      tap(( res ) => {
        this.jwtToken.next({
          isAuthenticated: true,
          token: res.data
        });
        localStorage.setItem('jwt', res.data);
      })
    );
  }

  public signout():void {
    this._http.get(`${api.apiUrl}/auth/signout`).subscribe(
      () => {
        this.jwtToken.next({
          isAuthenticated: false,
          token: null
        })
        localStorage.removeItem('jwt')
      } , 
      () => {
        this.jwtToken.next({
          isAuthenticated: false,
          token: null
        })
        localStorage.removeItem('jwt')
      }
    )
  }

  public editPangolin(pangolin: IPangolin):Observable<any> {
    return this._http.post<IPangolin>(`${api.apiUrl}/pangolin/edit`, pangolin).pipe(
      tap(res => {
        this.jwtToken.next({
          isAuthenticated: true,
          token: res.token
        })
      })
    )
  }

}
