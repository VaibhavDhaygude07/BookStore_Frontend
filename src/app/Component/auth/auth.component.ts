import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/User/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isLogin: boolean = true;

  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,   private router: Router,   private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNumber: ['', Validators.required]
    });
  }

  toggleForm(mode: 'login' | 'signup') {
    this.isLogin = (mode === 'login');
  }

 

  onLogin() {
    if (this.loginForm.valid) {
      const reqData = {
        EmailId: this.loginForm.value.email,
        Password: this.loginForm.value.password
      };
      
      this.userService.Login(reqData).subscribe({
        next: (res: any) => {
          console.log('Login successful:', res);
           localStorage.setItem('token', res.data.token); 
          this.snackBar.open('Login Successful', '', { duration: 5000 });
         
        this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login Failed:', err);
          if (err.error) {
            console.error('Server Response:', err.error);
          }
        }
      });
    }
  }
    
  onSignup() {
    if (this.signupForm.valid) {
      const reqData = {
        fullName: this.signupForm.value.fullName,
        emailId: this.signupForm.value.emailId,
        password: this.signupForm.value.password,
        mobileNumber: this.signupForm.value.mobileNumber
      };

      this.userService.Register(reqData).subscribe({
        next: (res: any) => {
          console.log('Signup successful:', res);
          localStorage.setItem('token', res.token); 
          this.snackBar.open('Signup Successful', '', { duration: 5000 }); 
         
        },
        error: (err) => {
          console.error('Signup Failed:', err);
          if (err.error) {
            console.error('Server Response:', err.error);
          }
        }
      });
    }
  }

  
}
