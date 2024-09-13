import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flightCreationDTO, flightDTO, flightEditDTO } from 'src/app/Interfaces/flight';
import { FlightsService } from 'src/app/Service/flights.service';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css'],
})
export class EditFlightComponent implements OnInit{
  constructor(private router: Router, private activedRoute: ActivatedRoute, private service : FlightsService) {}

  flightLoad? : flightDTO;

  ngOnInit(): void {
    this.activedRoute.params.subscribe((parametros) => {
      // alert(parametros.id);
      // console.log('Parametros', parametros);
      this.service.getById(parametros['id']).subscribe(
        (response) => {          
          if (response.body) {  // Verificar si el body no es null            
            this.flightLoad = response.body;
            console.log(this.flightLoad)
          } else {
            // Manejar el caso en que no se encuentra el vuelo
            console.error('No se encontró el vuelo');
            this.router.navigate(['/flights']);
          }
        },
        () => this.router.navigate(['/flights'])
      );
    });
  }

  editFlight(flightEditDTO: flightEditDTO) {
    if(flightEditDTO.arrivalTime != null && flightEditDTO.departureTime != null){
      flightEditDTO.arrivalTime = this.correctDateFormat(flightEditDTO.arrivalTime);
      flightEditDTO.departureTime = this.correctDateFormat(flightEditDTO.departureTime);
    }
    
    if (this.flightLoad?.id !== undefined) {
      this.service.update(this.flightLoad.id, flightEditDTO).subscribe((response) => {
        console.log(response)
        console.log(flightEditDTO);
        this.router.navigate(['/flights']);
      });
    } else {
      console.error("El id del vuelo es undefined, no se puede realizar la actualización.");
    }
  }

  correctDateFormat(dateString: string): string {
    // Expresión regular para eliminar el tercer : y todo lo que sigue
    return dateString.replace(/(:\d{2}){2}$/, '');
  }
}
