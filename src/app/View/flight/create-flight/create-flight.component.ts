import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { flightCreationDTO } from 'src/app/Interfaces/flight';
import { FlightsService } from 'src/app/Service/flights.service';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css'],
})
export class CreateFlightComponent {
  constructor(private service: FlightsService, private rotuer: Router) {}

  createFlight(flight: flightCreationDTO) {
    console.log(flight);

    this.service.create(flight).subscribe(
      (result) => {
        console.log(result);
        this.rotuer.navigate(['/flights']);
      },
      (error) => {
        if (error.includes('A flight with this number already exists.')) {
          console.log(error);
          alert(error);
          // this.addressForm.get('flightNumber')?.setErrors({ duplicate: true });
        }
      }
    );
  }
}
