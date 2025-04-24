import { Component } from '@angular/core';
import { CardBenefitComponent } from "../../../../shared/components/card-benefit/card-benefit.component";
import { Option } from '../../../../core/models/listOptions.model';
import { BenefitList } from '../../../../assets/data/benefitList';

@Component({
  selector: 'app-benefit',
  imports: [CardBenefitComponent],
  templateUrl: './benefit.component.html',
  styleUrl: './benefit.component.css'
})
export class BenefitComponent {
  benefitList: Option[] = BenefitList
}
