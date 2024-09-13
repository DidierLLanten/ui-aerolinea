import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { MenuComponent } from './Components/menu/menu.component';
import { IndexFlightsComponent } from './View/flight/index-flights/index-flights.component';
import { DialogConfirmComponent } from './Components/dialog-confirm/dialog-confirm.component';
import { LoadGenericListComponent } from './Components/load-generic-list/load-generic-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFlightComponent } from './View/flight/create-flight/create-flight.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IndexFlightsComponent,
    LoadGenericListComponent,
    CreateFlightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    DialogConfirmComponent,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
