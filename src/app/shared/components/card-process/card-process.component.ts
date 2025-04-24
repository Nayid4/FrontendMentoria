import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-process',
  imports: [],
  templateUrl: './card-process.component.html',
  styleUrl: './card-process.component.css'
})
export class CardProcessComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
}
