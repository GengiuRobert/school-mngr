import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  sticky = true;
  transparent = false;
  footerText = '© NgRx-University'; 
  
}
