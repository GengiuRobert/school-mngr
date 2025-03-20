import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/web-page-config/footer/footer.component';
import { HeaderComponent } from "../components/web-page-config/header/header.component";
import { LoginComponent } from "../components/register/login/login.component";
import { SignupComponent } from "../components/register/signup/signup.component";
import { HomeComponent } from '../components/pages/home/home.component';
import { AdminComponent } from "../components/views/admin/admin.component";
import { ProfessorComponent } from "../components/views/professor/professor.component";

@Component({
  selector: 'app-root',
  imports: [FooterComponent, HeaderComponent, LoginComponent, SignupComponent, HomeComponent, AdminComponent, ProfessorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-mngr';
}
