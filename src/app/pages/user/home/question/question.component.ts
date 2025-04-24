import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { Option } from '../../../../core/models/listOptions.model';
import { QuestionList } from '../../../../assets/data/questionList';

@Component({
  selector: 'app-question',
  imports: [
    AccordionModule
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  questionList: Option[] = QuestionList
}
