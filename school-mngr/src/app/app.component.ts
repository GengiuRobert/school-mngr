import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from "../components/header/header.component";
import { LoginComponent } from "../components/login/login.component";
import { SignupComponent } from "../components/signup/signup.component";
import { HomeComponent } from "../components/home/home.component";

@Component({
  selector: 'app-root',
  imports: [FooterComponent, HeaderComponent, LoginComponent, SignupComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-mngr';
}
