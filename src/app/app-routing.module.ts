import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path:"dashboard",component:ForbiddenComponent},
  {path:"test",component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
