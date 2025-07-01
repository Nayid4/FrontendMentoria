import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ListOptions, Option } from '../../../core/models/listOptions.model';
import { ButtonModule } from 'primeng/button';
import { ListaDeOpcionesEncabezado } from '../../../assets/data/ListaOpcionesEncabezado';

@Component({
  selector: 'app-header-user',
  imports: [
    RouterModule, 
    CommonModule, ButtonModule
  ],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent {
  isScrolled = false;
  alwaysFixed = false;
  menuVisible: boolean = false;

  listaDeOpciones: ListOptions[] = ListaDeOpcionesEncabezado;

  rutaIncripcion: string = '/inscripcion'
  rutaAutenticacion: string = '/autenticacion/iniciar-sesion'

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inyecta el PLATFORM_ID
  ) {}

  ngOnInit(): void {
    // Comprueba la ruta al inicializar el componente
    this.checkRoute();
    
    // Escucha cambios de ruta
    this.router.events.subscribe(() => {
      this.checkRoute();
      this.updateScrollState();
    });

    // Evaluar el scroll al cargar el componente
    this.updateScrollState();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.alwaysFixed) {
      this.updateScrollState();
    }
  }

  private checkRoute() {
    const currentRoute = this.router.url;
    // Comprueba si la ruta actual es 'realizar-pqrs' o 'consultar-pqrs'
    this.alwaysFixed = currentRoute.includes('realizar-pqrs') || currentRoute.includes('consultar-pqrs');
  }

  private updateScrollState() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.isScrolled = scrollPosition > 50;
    }
  }

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
