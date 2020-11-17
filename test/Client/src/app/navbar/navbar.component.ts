import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { IJwtToken } from './../models/jwt-token.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public jwtToken: IJwtToken;
  public sub: Subscription;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this._authService.jwtToken.subscribe((jwtToken: IJwtToken) => {
      this.jwtToken = jwtToken;
    })
  }

  public signout():void {
    this._authService.signout()
  }

  ngOnDestroy() {
    if(this.sub)
      this.sub.unsubscribe();
  }

}
