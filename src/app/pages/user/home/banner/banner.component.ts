import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [
    RouterModule
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  titulo: string  = "Nosotros"

  rutaConsultar: string = '/inscripcion'

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      // Opción 1: scrollIntoView (más simple, pero menos control sobre offset directo)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Opción 2: Usando window.scrollTo para un control preciso del offset (ej. para un header fijo)
      // const headerOffset = 50; // Altura de tu header fijo
      // const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      // window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
    }
  }
}
