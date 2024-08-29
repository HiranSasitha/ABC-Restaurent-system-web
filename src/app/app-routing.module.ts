import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {CategoryManageComponent} from "./admin/category-manage/category-manage.component";
import {AuthGuard} from "./auth/auth.guard";
import {ItemManageComponent} from "./admin/item-manage/item-manage.component";
import {BranchManageComponent} from "./admin/branch-manage/branch-manage.component";
import {UserManageComponent} from "./admin/user-manage/user-manage.component";
import {BranchComponent} from "./place-order/branch/branch.component";
import {CategoryComponent} from "./place-order/category/category.component";
import {ItemByBranchComponent} from "./place-order/item-by-branch/item-by-branch.component";
import {MyCartComponent} from "./place-order/my-cart/my-cart.component";
import {BranchItemManageComponent} from "./branch-admin/branch-item-manage/branch-item-manage.component";
import {UpdateOrderStatusComponent} from "./admin/update-order-status/update-order-status.component";
import {MyOrdersComponent} from "./my-orders/my-orders.component";

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:UserRegisterComponent},
  {path:"category",component:CategoryManageComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"item",component:ItemManageComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"branch",component:BranchManageComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"user",component:UserManageComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"active-branch",component:BranchComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN','ROLE_USER','ROLE_BRANCHADMIN']}},
  {path:"order-category",component:CategoryComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN','ROLE_USER','ROLE_BRANCHADMIN']}},
  {path:"order-item",component:ItemByBranchComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN','ROLE_USER','ROLE_BRANCHADMIN']}},
  {path:"my-cart",component:MyCartComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN','ROLE_USER','ROLE_BRANCHADMIN']}},
  {path:"branch-item-manage",component:BranchItemManageComponent,canActivate:[AuthGuard],data:{roles:['ROLE_BRANCHADMIN']}},
  {path:"order-status",component:UpdateOrderStatusComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN','ROLE_BRANCHADMIN']}},
  {path:"my-order",component:MyOrdersComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN','ROLE_USER','ROLE_BRANCHADMIN']}},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
