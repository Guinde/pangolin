import { AuthService } from './../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PangolinService } from './../services/pangolin.service';
import { IPangolin } from './../models/pangolin.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public friends: IPangolin[];
  public pangolins: IPangolin[];

  private _editForm: boolean = false
  private _sub: Subscription;

  get editForm(): boolean {
    return this._editForm;
  }

  constructor(private _pangolinService: PangolinService, private _authService: AuthService ,private _router: Router) { }

  ngOnInit(): void {
  this._sub = this._pangolinService.getCurrentPangolin().subscribe(
      (data: any) => {
        this.friends = data.friends.following;
        this.pangolins = data.pangolins;
      },
      (err) => { 
        this._router.navigate(['/signin']);
        this._authService.signout()
      }
    );
  }

  

  public editFormToggle():void {
    this._editForm = !this._editForm;
  }

  ngOnDestroy(): void {
    if(this._sub){
      this._sub.unsubscribe();
    }
  }

}
