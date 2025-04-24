import { Component } from '@angular/core';
import { StepList } from '../../../../assets/data/stepList';
import { CardProcessComponent } from '../../../../shared/components/card-process/card-process.component';
import { Option } from '../../../../core/models/listOptions.model';

@Component({
  selector: 'app-process',
  imports: [
    CardProcessComponent
  ],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class ProcessComponent {
  stepList: Option[] = StepList
}
