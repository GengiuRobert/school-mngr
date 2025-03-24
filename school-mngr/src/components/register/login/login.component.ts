import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { selectUser } from '../../store/auth/auth.selector';
import { Store } from '@ngrx/store';
import { logIn } from '../../store/auth/auth.actions';
@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  email = '';
  password = '';
  isAuthenticated = false;
  success: string | null = null;
  message: string | null = null;
  private userSub!: Subscription;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.userSub = this.store.select(selectUser).subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
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

    this.store.dispatch(logIn({ email: this.email, password: this.password }));

    this.store.select(selectUser).subscribe(user => {
      if (user) {
        this.success = "Logged in successfully!";
        this.resetForm();
        this.router.navigate(['/home']);
      }
    });
  }
}
