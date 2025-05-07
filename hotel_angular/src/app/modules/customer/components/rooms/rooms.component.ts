import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorageService } from 'src/app/auth/services/storage/user-storage.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {

  currentPage: any = 1;
  total: any;
  isSpinning = false;
  isVisibleMiddle = false;
  loading = false;
  rooms: any = [];
  id: number;
  date: Date[] = [];
  checkInDate: Date;
  checkOutDate: Date;

  constructor(private customerSerice: CustomerService,
    private router: Router,
    private message: NzMessageService) {
    this.getRooms();
  }

  onChange(result: Date[]): void {
    if (result.length === 2) {
      this.checkInDate = result[0];
      this.checkOutDate = result[1];
    }
  }

  showModalMiddle(id: number): void {
    this.isVisibleMiddle = true;
    this.id = id;
  }

  handleOkMiddle(): void {
    this.isSpinning = true;
    let obj = {
      userId: UserStorageService.getUserId(),
      roomId: this.id,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate
    }
    this.customerSerice.bookRoom(obj).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.message
        .success(
          `Request submitted for approval!`,
          { nzDuration: 5000 }
        );
      this.router.navigateByUrl('/customer/bookings');
    }, error => {
      this.message
        .error(
          `${error.error}`,
          { nzDuration: 5000 }
        )
    });
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

  getRooms() {
    this.customerSerice.getRooms(this.currentPage - 1).subscribe((res) => {
      console.log(res);
      this.rooms = res.roomDtoList;
      this.total = res.totalPages * 5;
    })
  }

  pageIndexChange(value: any) {
    this.currentPage = value;
    this.getRooms();
  }

}
