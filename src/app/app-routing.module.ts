import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexFlightsComponent } from './View/flight/index-flights/index-flights.component';
import { CreateFlightComponent } from './View/flight/create-flight/create-flight.component';
import { EditFlightComponent } from './View/flight/edit-flight/edit-flight.component';

const routes: Routes = [
  { path: '', component: IndexFlightsComponent }, 
  { path: 'flights', component: IndexFlightsComponent },
  { path: 'flights/create', component: CreateFlightComponent },  
  { path: 'flights/edit/:id', component: EditFlightComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
