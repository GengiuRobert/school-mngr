import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, CommonModule, FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  email = '';
  password = '';
  confirmPassword: string | null = '';
  role: string = 'Student';
  success: string | null = null;
  message: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  resetForm() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.role = 'Student';
  }

  onSignup(form: NgForm) {

    this.success = '';
    this.message = '';

    if (!form.valid) {
      this.message = "Invalid form!";
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = "Passwords do not match!";
      return;
    }


    this.authService.signUp(this.email, this.password, this.role).subscribe({
      next: (response) => {
        this.success = "Account created successfully!";
        this.resetForm();
        this.router.navigate(['/login']);
        console.log(response);
      },
      error: (err) => {
        this.message = err.message;
      }
    });

  }

}
