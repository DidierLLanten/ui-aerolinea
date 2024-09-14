import { HttpResponse } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { userDTO } from 'src/app/Interfaces/user';
import { DialogConfirmService } from 'src/app/Service/dialog-confirm.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-index-users',
  templateUrl: './index-users.component.html',
  styleUrls: ['./index-users.component.css'],
})
export class IndexUsersComponent implements OnInit {
  ngOnInit(): void {
    this.loadRecords();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly dialog = inject(MatDialog);

  constructor(private service: UserService, private dialogService: DialogConfirmService) {}

  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'email',
    'passwordHash',
    'role',
    'reservations',
    'actions'
  ];

  users = new MatTableDataSource<userDTO>();
  flight: userDTO | undefined;
  isLoading = true; // Bandera para el estado de carga

  applyFilter(event: Event) {    
    const filterValue = (event.target as HTMLInputElement).value;    
    this.users.filter = filterValue.trim().toLowerCase();
  }

  loadRecords() {
    this.isLoading = true;
    this.service.getAll().pipe(delay(1000)).subscribe((response: HttpResponse<userDTO[]>) => {
      this.users.data = response.body ?? [];
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
      this.isLoading = false; // Desactivar el estado de carga
    });
  }

  getById(id: number) {
    this.service.getById(id).subscribe((response: HttpResponse<userDTO>) => {
      if (response.body) {
        this.flight = response.body;
      } else {
        console.error('No user data found');
      }
    });
  }

  delete(id: number) {
    // alert('llamado accion borrar flight con id ' + id);
    this.service.delete(id).subscribe((response: HttpResponse<any>) => {
      console.log(response);
      if (response.ok) {
        this.loadRecords();
      }
    });
  }

  confirmDelete(id: number) {
    alert("confirmDelete llamado...")
    this.dialogService.openConfirmDialog(id, (id) => this.delete(id));
  }
}
