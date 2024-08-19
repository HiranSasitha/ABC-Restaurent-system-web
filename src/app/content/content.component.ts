import { Component } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  opened = true;
  constructor(private menuService:MenuService,public userService:UserService) {
    this.menuService.isOpened.subscribe(data =>{
      this.opened = data;
    })
  }

  closeSidebar() {
    this.menuService.toggle();  // Close the sidebar when a menu item is clicked
  }
}
