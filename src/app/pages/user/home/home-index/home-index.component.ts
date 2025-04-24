import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { ProcessComponent } from '../process/process.component';
@Component({
  selector: 'app-home-index',
  imports: [
    RouterModule,
    BannerComponent,
    ProcessComponent
  ],
  templateUrl: './home-index.component.html',
  styleUrl: './home-index.component.css'
})
export class HomeIndexComponent {
  titulo: string  = "Nosotros"

  
}
