import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.scss']
})
export class ViewBookingsComponent {

  currentPage: any = 1;
  total: any;
  bookings: any;
  isSpinning = false;

  constructor(private customerService: CustomerService) {
    this.getBookings();
  }

  getBookings() {
    this.isSpinning = true;
    this.customerService.getMyBookings(this.currentPage - 1).subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      this.bookings = res.reservationDtoList;
      this.total = res.totalPages * 5;
    })
  }

  pageIndexChange(value: any) {
    this.currentPage = value;
    this.getBookings();
  }


}
