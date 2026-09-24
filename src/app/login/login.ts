import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

// import { email } from '@angular/forms/signals';
// import { LoginResponse } from '../models/login-response'

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl<string>(""),
    password: new FormControl<string>("")
  })

constructor(
  private authService: AuthService,
  private router: Router,
) {}

login() {
    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    console.log(email)
    console.log(password)
  this.authService.login(email, password).subscribe({
    next: (response) => {
      console.log('Login successful', response);
      sessionStorage.setItem('token', response.token);
      this.router.navigate(['/home']);
    },

    error: (error: HttpErrorResponse) => {
      console.log('Login failed', error);
    }
  });
}

  //   handleProfile(){
  //     console.log(this.loginForm.value)
  //   }
    reset(){
     this.loginForm.setValue({
      email:'',
      password:''
    })   
   }

}
