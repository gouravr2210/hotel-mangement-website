import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isSpinning = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this.isSpinning = true;
    this.authService.register(this.registerForm.value).subscribe(
      (res) => {
        this.isSpinning = false;
        if (res.id != null) {
          this.message.success("Signup successful", { nzDuration: 5000 });
          this.router.navigateByUrl("/login");
        } else {
          this.message
            .error(
              `${res.message}`,
              { nzDuration: 5000 }
            )
        }
      })
  }

}
