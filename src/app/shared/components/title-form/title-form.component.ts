import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-form',
  imports: [],
  templateUrl: './title-form.component.html',
  styleUrl: './title-form.component.css'
})
export class TitleFormComponent {
  @Input() title: string = '';
}
