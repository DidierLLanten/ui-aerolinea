import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FlightsService } from '../../../Service/flights.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { flightDTO } from 'src/app/Interfaces/flight';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmService } from 'src/app/Service/dialog-confirm.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-index-flights',
  templateUrl: './index-flights.component.html',
  styleUrls: ['./index-flights.component.css'],
})
export class IndexFlightsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns = [
    'id',
    'flightNumber',
    'airline',
    'origin',
    'destination',
    'departureTime',
    'arrivalTime',
    'price',
    'availableSeats',
    'totalSeats',
    'actions',
  ];

  flights = new MatTableDataSource<flightDTO>();
  flight: flightDTO | undefined;
  isLoading = true;
  readonly dialog = inject(MatDialog);

  constructor( private service: FlightsService, private dialogService: DialogConfirmService) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.flights.filter = filterValue.trim().toLowerCase();
  }

  loadRecords() {
    this.isLoading = true;
    this.service
      .getAll()
      .pipe(delay(1000))
      .subscribe((response: HttpResponse<flightDTO[]>) => {
        this.flights.data = response.body ?? [];
        this.flights.paginator = this.paginator;
        this.flights.sort = this.sort;
        this.isLoading = false; // Desactivar el estado de carga
      });
  }

  delete(id: number) {
    // alert('llamado accion borrar flight con id ' + id);
    this.service.delete(id).subscribe((response: HttpResponse<any>) => {
      if (response.ok) {
        this.loadRecords();
      }
    });
  }

  confirmDelete(id: number) {
    this.dialogService.openConfirmDialog(id, (id) => this.delete(id));
  }
}
