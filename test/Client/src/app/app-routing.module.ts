import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninFormComponent } from './auth/signin-form/signin-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'signin', component: SigninFormComponent},
  { path: 'signup', component: SignupFormComponent},
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  //{ path: '',   redirectTo: '/signin', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
