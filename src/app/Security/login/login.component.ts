import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userLoginDTO } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: UserService, private rotuer: Router) {}

  private fb = inject(FormBuilder);

  userForm = this.fb.group({    
    email: ['test@airline.com', Validators.compose([Validators.required, Validators.email])],
    password: ['abc', Validators.required]
  });

  idUserActived: string = ''

  ngOnInit(): void {    
    this.idUserActived = this.service.obtenerValueOfStorage("ID");
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {    
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login(): void {    
    if(this.userForm.valid){
      const userLogin : userLoginDTO = this.userForm.value;
      this.service.authenticate(userLogin).subscribe(
        (response) => {          
          this.service.guardarToken(response.body, response.body.id, response.body.role);
          this.rotuer.navigate(['']);
        },
        (error) => {
          alert("Incorrect email or password");
        }
      );

    }
    
  }
}
