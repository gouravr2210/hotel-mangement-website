import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../services/auth/auth.service';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSpinning = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this.isSpinning = true;
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole
          }
          UserStorageService.saveUser(user);
          UserStorageService.saveToken(res.jwt);
          this.isSpinning = false;
          if (UserStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('/admin/rooms');
          } else if (UserStorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('/customer/rooms');
          }
        } else {
          this.message
            .error(
              `Bad credentials`,
              { nzDuration: 5000 }
            )
        }
      })
  }

}