import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UserRegisterComponent} from "./user-register/user-register.component";

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:UserRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
