import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-update-rooms',
  templateUrl: './update-rooms.component.html',
  styleUrls: ['./update-rooms.component.scss']
})
export class UpdateRoomsComponent {

  id: any = this.activatedroute.snapshot.params['id'];
  updateRoomForm: FormGroup;
  isSpinning = false;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private adminService: AdminService,
    private router: Router,
    private activatedroute: ActivatedRoute) {
    this.updateRoomForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.getRoomById();
  }

  getRoomById() {
    this.adminService.getRoomById(this.id).subscribe((res) => {
      this.updateRoomForm.patchValue(res);
    })
  }

  submitForm() {
    this.isSpinning = true;
    this.adminService.updateRoomDetails(this.id, this.updateRoomForm.value).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.message
        .success(
          `Room updated Successfully`,
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
