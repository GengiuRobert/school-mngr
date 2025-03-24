import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavButton } from '../../../models/navbutton.model';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/auth/auth.selector';
import { logout } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  imports: [NgFor, RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  sticky = true;
  isAuthenticated = false;
  role: string | null = null;
  private userSub!: Subscription;
  menu = [
    { name: 'Home', url: '/home' },
    { name: 'About Us', url: '/about' },
    { name: 'Services', url: '/services' },
    { name: 'Contact', url: '/contact' }
  ];
  menuOpen = true;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.userSub = this.store.select(selectUser).subscribe(user => {
      this.isAuthenticated = !!user;
      this.role = user ? user.role : null;
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToLogout(): void {
    this.store.dispatch(logout());
  }

  goToRoleView(): void {
    if (this.role === 'Admin') {
      this.router.navigate(['/admin']);
    } else if (this.role === 'Student') {
      this.router.navigate(['/student']);
    } else if (this.role === 'Professor') {
      this.router.navigate(['/professor']);
    }
  }
}
