import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/web-page-config/footer/footer.component';
import { HeaderComponent } from "../components/web-page-config/header/header.component";

@Component({
  selector: 'app-root',
  imports: [FooterComponent, HeaderComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-mngr';
}
