import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  public error: string;

  constructor(private _authService: AuthService, private _router:Router) { }

  ngOnInit(): void {
  }

  public submit(formData): void {
    this._authService.signup(formData).subscribe(() => {
      this._router.navigate(['/signin'])
    }, err => {
      this.error = err.error.error
    })
  }


}
