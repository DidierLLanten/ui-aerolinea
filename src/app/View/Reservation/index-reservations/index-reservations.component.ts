import { HttpResponse } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { ReservationDTO } from 'src/app/Interfaces/reservation';
import { DialogConfirmService } from 'src/app/Service/dialog-confirm.service';
import { ReservationService } from 'src/app/Service/reservation.service';

@Component({
  selector: 'app-index-reservations',
  templateUrl: './index-reservations.component.html',
  styleUrls: ['./index-reservations.component.css']
})
export class IndexReservationsComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;   

  displayedColumns = [
    'id',
    'userId',
    'flightId',
    'numberOfPassengers',
    // 'seats',
    'reservationDate',
    'actions',
  ];

  reservations = new MatTableDataSource<ReservationDTO>();
  isLoading = true;
  readonly dialog = inject(MatDialog);

  constructor(private service: ReservationService, private dialogService: DialogConfirmService) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  applyFilter(event: Event) {    
    const filterValue = (event.target as HTMLInputElement).value;    
    this.reservations.filter = filterValue.trim().toLowerCase();
  }

  loadRecords() {
    this.isLoading = true;
    this.service.getAll().pipe(delay(1000)).subscribe((response: HttpResponse<ReservationDTO[]>) => {
      this.reservations.data = response.body ?? [];
      this.reservations.paginator = this.paginator;
      this.reservations.sort = this.sort;
      this.isLoading = false;
    });
  }
  
  delete(id: number) {    
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
