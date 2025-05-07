import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostRoomComponent } from './components/post-room/post-room.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ViewRoomsComponent } from './components/view-rooms/view-rooms.component';
import { UpdateRoomsComponent } from './components/update-rooms/update-rooms.component';

const routes: Routes = [
  { path: 'room', component: PostRoomComponent },
  { path: 'room/:id/edit', component: UpdateRoomsComponent },
  { path: 'rooms', component: ViewRoomsComponent },
  { path: 'reservations', component: ReservationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
