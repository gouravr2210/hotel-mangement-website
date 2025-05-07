import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/DemoNgZorroAntdModule';
import { PostRoomComponent } from './components/post-room/post-room.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ViewRoomsComponent } from './components/view-rooms/view-rooms.component';
import { UpdateRoomsComponent } from './components/update-rooms/update-rooms.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAffixModule } from 'ng-zorro-antd/affix';


@NgModule({
  declarations: [
    PostRoomComponent,
    ReservationsComponent,
    ViewRoomsComponent,
    UpdateRoomsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    NzAffixModule,
    NzToolTipModule,
  ]
})
export class AdminModule { }
