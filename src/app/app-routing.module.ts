import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexFlightsComponent } from './View/flight/index-flights/index-flights.component';
import { CreateFlightComponent } from './View/flight/create-flight/create-flight.component';
import { EditFlightComponent } from './View/flight/edit-flight/edit-flight.component';
import { CreateUserComponent } from './View/user/create-user/create-user.component';
import { IndexUsersComponent } from './View/user/index-users/index-users.component';
import { EditUserComponent } from './View/user/edit-user/edit-user.component';
import { CreateReservationComponent } from './View/Reservation/create-reservation/create-reservation.component';

const routes: Routes = [
  { path: '', component: IndexFlightsComponent }, 
  { path: 'flights', component: IndexFlightsComponent },
  { path: 'flights/create', component: CreateFlightComponent },  
  { path: 'flights/edit/:id', component: EditFlightComponent },

  { path: 'users', component: IndexUsersComponent },
  { path: 'users/create', component: CreateUserComponent },
  { path: 'users/edit/:id', component: EditUserComponent },

  { path: 'reservations/create/:id', component: CreateReservationComponent },


  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
