import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-card-fancy',
  imports: [MatButtonModule,MatCardModule],
  templateUrl: './card-fancy.component.html',
  styleUrl: './card-fancy.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFancyComponent {}
