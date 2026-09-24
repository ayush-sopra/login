import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl,FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-signup',
  styleUrl: './signup.scss',
  templateUrl: './signup.html',
})
export class Signup {

  private userService = inject(UserService);

  signUpForm = new FormGroup({
    name : new FormControl('', [Validators.required]), //u can set default values by writing the name here itself and set validators
    email : new FormControl('', [Validators.pattern("^[A-Za-z0-9._%+-]+@soprasteria\\.com$"), Validators.required]),
    password : new FormControl('', [Validators.minLength(12), Validators.required])
  });

  createUser() {

  const formData = this.signUpForm.value;
  const request = this.userService.createUser(formData);

  request.subscribe((response) => {
    console.log('Signup successful:', response);
  });

  }

  get name() {
  return this.signUpForm.controls.name;
  }

  get email() {
  return this.signUpForm.controls.email;
  }
  get password() {
  return this.signUpForm.controls.password;
  }

}
