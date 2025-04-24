import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { ProcessComponent } from '../process/process.component';
import { BenefitComponent } from "../benefit/benefit.component";
import { QuestionComponent } from "../question/question.component";
import { ObjetiveComponent } from "../objetive/objetive.component";
import { FooterUserComponent } from "../../../../shared/components/footer-user/footer-user.component";
@Component({
  selector: 'app-home-index',
  imports: [
    RouterModule,
    BannerComponent,
    ProcessComponent,
    BenefitComponent,
    QuestionComponent,
    ObjetiveComponent,
    FooterUserComponent
],
  templateUrl: './home-index.component.html',
  styleUrl: './home-index.component.css'
})
export class HomeIndexComponent {
  titulo: string  = "Nosotros"

  
}
