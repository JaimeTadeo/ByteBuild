import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet // <-- Solo esto es necesario
  ]
})
export class AppComponent {
  title = 'ByteBuilder';
}