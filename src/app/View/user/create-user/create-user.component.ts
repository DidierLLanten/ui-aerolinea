import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userCreationDTO } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  constructor(private service: UserService, private rotuer: Router) {}

  createUser(user: userCreationDTO) {
    this.service.create(user).subscribe(
      (response) => {
        console.log(response);
        this.rotuer.navigate(['/users']);
      },
      (error) => {
        console.log(error);
        if (error.includes('Email duplicate')) {
          console.log(error);
          alert(error);          
        }
      }
    );
  }
}
