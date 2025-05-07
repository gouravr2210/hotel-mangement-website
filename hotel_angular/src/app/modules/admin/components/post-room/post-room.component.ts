import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-room',
  templateUrl: './post-room.component.html',
  styleUrls: ['./post-room.component.scss']
})
export class PostRoomComponent implements OnInit {

  roomDetailsForm: FormGroup;
  isSpinning = false;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private adminService: AdminService,
    private router: Router) {
    this.roomDetailsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.isSpinning = true;
    this.adminService.postRoomDetails(this.roomDetailsForm.value).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.message
        .success(
          `Room Posted Successfully`,
          { nzDuration: 5000 }
        );
      this.router.navigateByUrl('/admin/rooms');
    }, error => {
      this.message
        .error(
          `${error.error}`,
          { nzDuration: 5000 }
        )
    });
  }
}
