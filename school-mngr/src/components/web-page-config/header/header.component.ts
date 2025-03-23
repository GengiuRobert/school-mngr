import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavButton } from '../../../models/navbutton.model';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [NgFor, RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  sticky = true;
  isAuthenticated = false;
  role: string | null = null;
  private userSub!: Subscription;


  menu: NavButton[] = [
    { name: 'Home', url: '/home' },
    { name: 'About Us', url: '/about' },
    { name: 'Services', url: '/services' },
    { name: 'Contact', url: '/contact' }
  ];
  menuOpen = true;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.role = user ? user.role : null;
    });
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

  goToLogout() {
    this.authService.logout();
  }

  goToRoleView() {
    if (this.role === 'Admin') {
      this.router.navigate(['/admin']);
    } else if (this.role === 'Student') {
      this.router.navigate(['/student']);
    } else if (this.role === 'Professor') {
      this.router.navigate(['/professor']);
    }
  }

}
