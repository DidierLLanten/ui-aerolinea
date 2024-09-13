import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cityDTO } from 'src/app/Interfaces/city';
import { flightCreationDTO } from 'src/app/Interfaces/flight';
import { FlightsService } from 'src/app/Service/flights.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent {

  private fb = inject(FormBuilder);
  minDate: Date = new Date(new Date().setHours(0, 0, 0, 0)); 

  constructor( private service: FlightsService, private rotuer: Router ) {}

  addressForm = this.fb.group({ 
    airline: [null, Validators.required],
    flightNumber: ["abc123", Validators.compose([
      Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    ],
    origin:[null, Validators.required],
    destination:[null, Validators.required],
    departureDate:[this.minDate, Validators.required],
    departureTime:[null, Validators.required],
    arrivalDate:[null, Validators.required],
    // arrivalDate: [null, [Validators.required, this.arrivalDateValidator()]],
    arrivalTime:[null, Validators.required],
    price: [100000, Validators.compose([
      Validators.required, Validators.min(20000), Validators.max(5000000)])
    ],
    totalSeats: [11, Validators.compose([
      Validators.required, Validators.min(10), Validators.max(100)])
    ]
  });
  

  cities: cityDTO[] = [
    { name: 'Armenia', abbreviation: 'AXM', postalCode: '630001', airport: 'El Edén International Airport' },
    { name: 'Barranquilla', abbreviation: 'BAQ', postalCode: '080001', airport: 'Ernesto Cortissoz International Airport' },
    { name: 'Bogotá', abbreviation: 'BOG', postalCode: '110001', airport: 'El Dorado International Airport' },
    { name: 'Bucaramanga', abbreviation: 'BGA', postalCode: '680001', airport: 'Palonegro International Airport' },
    { name: 'Cali', abbreviation: 'CLO', postalCode: '760001', airport: 'Alfonso Bonilla Aragón International Airport' },
    { name: 'Cartagena', abbreviation: 'CTG', postalCode: '130001', airport: 'Rafael Núñez International Airport' },
    { name: 'Cúcuta', abbreviation: 'CUC', postalCode: '540001', airport: 'Camilo Daza International Airport' },
    { name: 'Ibagué', abbreviation: 'IBG', postalCode: '730001', airport: 'Perales Airport' },
    { name: 'Leticia', abbreviation: 'LET', postalCode: '910001', airport: 'Alfredo Vásquez Cobo International Airport' },
    { name: 'Manizales', abbreviation: 'MZL', postalCode: '170001', airport: 'La Nubia Airport' },
    { name: 'Medellín', abbreviation: 'MDE', postalCode: '050001', airport: 'José María Córdova International Airport' },
    { name: 'Medellín', abbreviation: 'EOH', postalCode: '050001', airport: 'Olaya Herrera Airport' },
    { name: 'Montería', abbreviation: 'MTR', postalCode: '230001', airport: 'Los Garzones Airport' },
    { name: 'Neiva', abbreviation: 'NVA', postalCode: '410001', airport: 'Benjamín Méndez Airport' },
    { name: 'Pasto', abbreviation: 'PSO', postalCode: '520001', airport: 'Antonio Nariño Airport' },
    { name: 'Pereira', abbreviation: 'PEI', postalCode: '660001', airport: 'Matecaña International Airport' },
    { name: 'San Andrés', abbreviation: 'ADZ', postalCode: '880001', airport: 'Gustavo Rojas Pinilla International Airport' },
    { name: 'Santa Marta', abbreviation: 'SMR', postalCode: '470001', airport: 'Simón Bolívar International Airport' },
    { name: 'Sincelejo', abbreviation: 'SIN', postalCode: '700001', airport: 'Corozal Airport' },
    { name: 'Tuluá', abbreviation: 'TUL', postalCode: '763001', airport: 'Hermanos Añez Airport' },
    { name: 'Valledupar', abbreviation: 'VUP', postalCode: '200001', airport: 'Alfonso López Michelsen Airport' },
    { name: 'Villavicencio', abbreviation: 'VVC', postalCode: '500001', airport: 'Vanguardia Airport' },
    { name: 'Yopal', abbreviation: 'YOP', postalCode: '850001', airport: 'El Alcaraván Airport' },
    { name: 'San Gil', abbreviation: 'SGS', postalCode: '684001', airport: 'San Gil Airport' },
    { name: 'Quibdó', abbreviation: 'UIB', postalCode: '272001', airport: 'El Caraño Airport' },
    { name: 'Mocoa', abbreviation: 'MCS', postalCode: '860001', airport: 'Villa de Mocoa Airport' }
  ];

  airlines = [  
    { name: 'Aero República', codeIATA: 'P5' },
    { name: 'Avianca', codeIATA: 'AV' },  
    { name: 'Air Canada', codeIATA: 'AC' },
    { name: 'Air France', codeIATA: 'AF' },
    { name: 'Alitalia', codeIATA: 'AZ' },
    { name: 'American Airlines', codeIATA: 'AA' },
    { name: 'Aeroméxico', codeIATA: 'AM' },
    { name: 'British Airways', codeIATA: 'BA' },
    { name: 'Copa Airlines', codeIATA: 'CM' },
    { name: 'Delta Air Lines', codeIATA: 'DL' },
    { name: 'EasyFly', codeIATA: 'VE' },  
    { name: 'Emirates', codeIATA: 'EK' },
    { name: 'GOL Linhas Aéreas', codeIATA: 'G3' },
    { name: 'Icelandair', codeIATA: 'FI' },
    { name: 'Iberia', codeIATA: 'IB' },
    { name: 'JetBlue Airways', codeIATA: 'B6' },
    { name: 'KLM Royal Dutch Airlines', codeIATA: 'KL' },
    { name: 'LATAM Airlines', codeIATA: 'LA' },  
    { name: 'Lufthansa', codeIATA: 'LH' },
    { name: 'Magnicharters', codeIATA: '5D' },
    { name: 'Qatar Airways', codeIATA: 'QR' },
    { name: 'Satena', codeIATA: '9N' },  
    { name: 'Sky Airline', codeIATA: 'H2' },
    { name: 'Southwest Airlines', codeIATA: 'WN' },
    { name: 'Swiss International Air Lines', codeIATA: 'LX' },
    { name: 'TAP Air Portugal', codeIATA: 'TP' },  
    { name: 'Turkish Airlines', codeIATA: 'TK' },
    { name: 'Viva Aerobus', codeIATA: 'VB' },
    { name: 'Wingo', codeIATA: 'P5' },
  ];

  arrivalDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const departureDate = control?.parent?.get('departureDate')?.value;
      const arrivalDate = control.value;
  
      if (!departureDate || !arrivalDate) {
        return null; // Si uno de los dos no está presente, no mostrar error
      }
  
      // Comparar las fechas
      if (new Date(departureDate).getTime() >= new Date(arrivalDate).getTime()) {
        return { 'invalidArrivalDate': true }; // Fecha de llegada es anterior o igual a la de salida
      }
  
      return null; // Si todo está bien, no hay error
    };
  }

  getErrorInputDate() {
    console.log("Entro a getErrorInputDate")
    const inputDepartureDate = this.addressForm.get('departureDate')?.value;
    console.log(inputDepartureDate)
    const inputArrivalDate = this.addressForm.get('arrivalDate')?.value;
    console.log(inputArrivalDate)
    const inputDepartureTime = this.addressForm.get('departureTime');
    const inputArrivalTime = this.addressForm.get('arrivalDate');
    if (inputArrivalDate == null) {
      return 'No es una fecha valida';
    }    
    if (inputDepartureDate && inputDepartureTime && inputArrivalDate && inputArrivalTime) {
      console.log("Entro al if 1")
      if(inputDepartureDate.toString() == inputArrivalDate){
        console.log("Entro al if 2")
        if(inputDepartureTime === inputArrivalTime || inputDepartureTime <= inputArrivalTime){
          console.log("Entro al if 3")
        return 'The departure date cannot be earlier than the arrival date';
        }
      }
    }
    return "Arrival date is required"    
  }

  onSubmit(): void {
    if(this.addressForm.valid){

    const formValues = this.addressForm.value;  

  // Convertir los valores de fecha y hora a cadenas en formato ISO
    const departureDateTimeString = formValues.departureDate && formValues.departureTime
    ? `${this.formatDate(formValues.departureDate)}T${formValues.departureTime}:00` // Agregar los segundos
    : null;

    const arrivalDateTimeString = formValues.arrivalDate && formValues.arrivalTime
    ? `${this.formatDate(formValues.arrivalDate)}T${formValues.arrivalTime}:00` // Agregar los segundos
    : null;

    // Crear objetos Date para validar y convertir a formato ISO
    const departureDateTime = departureDateTimeString
    ? new Date(departureDateTimeString)
    : null;

    const arrivalDateTime = arrivalDateTimeString
    ? new Date(arrivalDateTimeString)
    : null;
    
    // Verificar si la fecha es válida
    const departureDateTimeISO = departureDateTime && !isNaN(departureDateTime.getTime()) 
    ? departureDateTime.toISOString()
    : null;

    const arrivalDateTimeISO = arrivalDateTime && !isNaN(arrivalDateTime.getTime())
    ? arrivalDateTime.toISOString()
    : null;

    const flight : flightCreationDTO = formValues;
    flight.departureTime = departureDateTimeString;
    flight.arrivalTime = arrivalDateTimeString;

    this.service.create(this.addressForm.value).subscribe((result) => {
      console.log(result)
      alert('Flight created successfully');
      this.rotuer.navigate(['/flights']);
    },
    error => {      
      if (error.includes('A flight with this number already exists.')) {
        this.addressForm.get('flightNumber')?.setErrors({ duplicate: true });
      }
    });
  }
    
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
