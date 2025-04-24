import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-benefit',
  imports: [],
  templateUrl: './card-benefit.component.html',
  styleUrl: './card-benefit.component.css'
})
export class CardBenefitComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
