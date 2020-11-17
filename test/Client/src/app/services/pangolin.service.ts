import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IPangolin } from './../models/pangolin.models';
import api from './../environment/development.js'

@Injectable({
  providedIn: 'root'
})
export class PangolinService {

  public currentPangolin: BehaviorSubject<IPangolin> = new BehaviorSubject(null)
  public addFriend: BehaviorSubject<IPangolin> = new BehaviorSubject(null)
  public removeFriend: BehaviorSubject<IPangolin> = new BehaviorSubject(null)

  constructor(private _http: HttpClient) { }

  public getCurrentPangolin(): Observable<any> {
      return this._http.get(`${api.apiUrl}/pangolin/profile`).pipe(
        tap((res: any) => {
          this.currentPangolin.next(res.data)
        })
      )
  }

  public editCurrentPangolin(formData):Observable<any> {
    return this._http.post(`${api.apiUrl}/pangolin/edit`, formData).pipe(
      tap(( res: any ) => {
        this.currentPangolin.next(res.data)
      })
    );
  }

  public addPangolinFriend(pangolin: IPangolin):Observable<any> {
    return this._http.post(`${api.apiUrl}/pangolin/add`, pangolin)
  }

  public removePangolinFriend(pangolin: IPangolin):Observable<any> {
    return this._http.post(`${api.apiUrl}/pangolin/remove`, pangolin)
  }
}
