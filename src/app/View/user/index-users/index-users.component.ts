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
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;   

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
  isLoading = true;
  readonly dialog = inject(MatDialog);

  constructor(private service: UserService, private dialogService: DialogConfirmService) {}

  ngOnInit(): void {
    this.loadRecords();
  }

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
