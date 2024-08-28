import { Component } from '@angular/core';
import {MenuService} from "../service/menu.service";
import {UserAuthService} from "../service/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private menuService: MenuService, public userAuth: UserAuthService, private router: Router) {
  }

  toggleMenu() {
    this.menuService.toggle();
  }

  public isLogin() {
    return this.userAuth.isLogin();
  }

  public logOut() {
    this.userAuth.clear();
    localStorage.removeItem('items');
    this.router.navigate(["/login"]);
  }


}
