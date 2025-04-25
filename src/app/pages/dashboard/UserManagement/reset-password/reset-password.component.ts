import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-reset-password',
  imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  formulario!: FormGroup
  user!: User
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.authService.dataAuthenticated$
    .subscribe({
      next: (resp) => {
        //this.user = resp;
      }
    })
  }


}
