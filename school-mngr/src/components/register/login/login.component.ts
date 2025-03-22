import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AuthResponseData } from '../../../models/authresponse.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [RouterModule,CommonModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  isAuthenticated = false;
  success: string | null = null;
  message: string | null = null;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  resetForm() {
    this.email = '';
    this.password = '';
  }

  onLogin(form: NgForm) {

    this.success = '';
    this.message = '';

    if (!form.valid) {
      return;
    }

    this.authService.logIn(this.email, this.password).subscribe({
      next: (response: AuthResponseData) => {
        this.success = "Logged in successfully!";
        this.resetForm();
        this.router.navigate(['/home']);
        console.log(response);
      },
      error: (err: HttpErrorResponse) => {
        this.message = err.message;
      }
    });

  }
}
