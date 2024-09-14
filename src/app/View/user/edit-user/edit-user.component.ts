import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userDTO, userEditDTO } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  constructor(private router: Router, private activedRoute: ActivatedRoute, private service : UserService) {}

  userLoad?: userDTO;

  ngOnInit(): void {
    this.activedRoute.params.subscribe((parametros) => {
      this.service.getById(parametros['id']).subscribe(
        (response) => {
          if (response.body) {
            this.userLoad = response.body;            
          } else {
            console.error('No se encontró el usuario');
            this.router.navigate(['/users']);
          }
        },
        () => this.router.navigate(['/users'])
      );
    });
  }

  editUser(userEditDTO: userEditDTO): void {    
    if (this.userLoad?.id !== undefined) {
      this.service
        .update(this.userLoad?.id, userEditDTO)
        .subscribe((response) => {
          alert(response.body.message)          
          this.router.navigate(['/users']);
        });
    } else {
      console.error(
        'El id del user es undefined, no se puede realizar la actualización.'
      );
    }
  }
}
