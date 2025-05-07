import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.scss']
})
export class ViewRoomsComponent {

  currentPage: any = 1;
  total: any;
  loading = false;
  rooms: any = [];

  constructor(private adminService: AdminService,
    private message: NzMessageService,
    private modalService: NzModalService) {
    this.getRooms();
  }

  showConfirm(roomId: any): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want to delete this room?',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOnOk: () => this.deleteRoom(roomId)
    });
  }

  getRooms() {
    this.adminService.getRooms(this.currentPage - 1).subscribe((res) => {
      console.log(res);
      this.rooms = res.roomDtoList;
      this.total = res.totalPages * 5;
    })
  }

  deleteRoom(roomId: any) {
    this.adminService.deleteRoom(roomId).subscribe((res) => {
      this.getRooms();
      this.message
        .success(
          `Room Deleted Successfully`,
          { nzDuration: 5000 }
        );
    })
  }

  pageIndexChange(value: any) {
    this.currentPage = value;
    this.getRooms();
  }

}
