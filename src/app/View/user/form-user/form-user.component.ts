import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { userCreationDTO, userDTO } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
})
export class FormUserComponent implements OnInit {
  @Output()
  OnSubmit: EventEmitter<userCreationDTO> = new EventEmitter<userCreationDTO>();

  @Input()
  modelo?: userDTO;

  private fb = inject(FormBuilder);

  passwordTest = "";

  userForm = this.fb.group({
    firstName: ['Test', Validators.required],
    lastName: ['Prueba', Validators.required],
    email: ['test@airline.com', Validators.compose([Validators.required, Validators.email])],
    PasswordHash: ['abc', Validators.required],
    confirmPassword: ['abc', Validators.required]
  }, { validators: this.passwordsMatchValidator });

  ngOnInit(): void {    
    console.log("user cargado: "+this.modelo);
    if (this.modelo !== undefined) {      
      this.userForm.patchValue(this.modelo);
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {    
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  sendForm(): void{    
    if(this.userForm.valid){      
      this.OnSubmit.emit(this.userForm.value)
    }    
  }

  passwordsMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('PasswordHash')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    // Check if confirmPassword is empty
    if (!confirmPassword) {
      return { confirmPasswordRequired: true };
    }

    // Check if passwords match
    if (password && confirmPassword && password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    }

    // Clear the error if passwords match
    formGroup.get('confirmPassword')?.setErrors(null);
    return null;
  }
}
