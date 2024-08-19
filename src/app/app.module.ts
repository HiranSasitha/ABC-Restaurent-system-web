import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from "@angular/material/icon";
import {ContentComponent} from "./content/content.component";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import { UserRegisterComponent } from './user-register/user-register.component';
import {MatInputModule} from "@angular/material/input";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PicCardComponent } from './pic-card/pic-card.component';
import { PicCardVComponent } from './pic-card-v/pic-card-v.component';
import { CategoryManageComponent } from './admin/category-manage/category-manage.component';
import { CategoryCreateComponent } from './admin/category-manage/category-create/category-create.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AuthGuard} from "./auth/auth.guard";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ForbiddenComponent,
    LoginComponent,
    DashboardComponent,
    UserRegisterComponent,
    PicCardComponent,
    PicCardVComponent,
    CategoryManageComponent,
    CategoryCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,



  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
