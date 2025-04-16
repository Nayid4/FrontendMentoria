import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderUserComponent } from '../../../shared/components/header-user/header-user.component';

@Component({
  selector: 'app-user-layout',
  imports: [
    RouterOutlet,
    HeaderUserComponent
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
