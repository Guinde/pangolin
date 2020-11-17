import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {

  public form: FormGroup;
  public error: string;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router:Router) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      login: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  public submit(): void {
    if(this.form.valid){
      this._authService.signin(this.form.value).subscribe(() => {
        this._router.navigate(['/home'])
      }, err => {
        this.error = err.error.error
      })
    }
  }

}
