import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';
  success: string | null = null;
  message: string | null = null;


  constructor(private authService: AuthService, private router: Router) { }

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
      next: (response) => {
        this.success = "Logged in successfully!";
        this.resetForm();
        this.router.navigate(['/home']);
        console.log(response);
      },
      error: (err) => {
        this.message = err.message;
      }
    });

  }
}
