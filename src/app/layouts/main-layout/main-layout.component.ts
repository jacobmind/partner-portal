import { Component } from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {

}
