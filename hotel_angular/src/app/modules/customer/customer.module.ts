import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';
import { DemoNgZorroAntdModule } from 'src/app/DemoNgZorroAntdModule';


@NgModule({
  declarations: [
    ViewBookingsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoNgZorroAntdModule
  ]
})
export class CustomerModule { }
