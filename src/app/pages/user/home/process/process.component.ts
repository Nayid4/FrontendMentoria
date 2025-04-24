import { Component } from '@angular/core';
import { Step } from '../../../../core/models/step.model';
import { StepList } from '../../../../assets/data/stepList';
import { CardProcessComponent } from '../../../../shared/components/card-process/card-process.component';

@Component({
  selector: 'app-process',
  imports: [
    CardProcessComponent
  ],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class ProcessComponent {
  stepList: Step[] = StepList
}
