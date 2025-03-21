import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NavButton } from '../../../models/navbutton.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgFor, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  sticky = true;

  menu: NavButton[] = [
    { name: 'Home', url: '/home' },
    { name: 'About Us', url: '/about' },
    { name: 'Services', url: '/services' },
    { name: 'Contact', url: '/contact' }
  ];
  menuOpen = true;

  constructor(private router: Router) { }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
