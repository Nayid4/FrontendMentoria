import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ListOptions } from '../../../core/models/listOptions.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { PanelMenu } from 'primeng/panelmenu';
import { ListaDeOpcionesMenu } from '../../../assets/data/listaDeOpcionesMenu';
import { AuthService } from '../../../core/services/auth.service';
import { DataUser } from '../../../core/models/dataUser.model';


@Component({
  selector: 'app-side-menu-dashboard',
  imports: [AccordionModule, CommonModule, RouterModule, PanelMenu],
  templateUrl: './side-menu-dashboard.component.html',
  styleUrl: './side-menu-dashboard.component.css',
})
export class SideMenuDashboardComponent implements OnInit {
  @Input() isMenuVisible!: boolean;
  @Output() toggleMenu = new EventEmitter<void>();

  selectedOption: string | null = 'Inicio';
  selectedAccordionOption: string | null = null;
  opcionUsuario: boolean = false;
  listaOpciones: ListOptions[] = ListaDeOpcionesMenu;

  items: MenuItem[] | undefined;
  user!: DataUser

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.dataAuthenticated$.subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);
      }
    })

    this.items = ListaDeOpcionesMenu
  .filter(opcion => !opcion.roles || opcion.roles.includes(this.user.role))
  .map(opcion => {
    const tieneSubopciones = Array.isArray(opcion.options) && opcion.options.length > 0;

    return {
      label: opcion.label,
      icon: opcion.icon,
      ...(tieneSubopciones ? {} : { routerLink: opcion.url }),
      ...(tieneSubopciones
        ? {
            items: opcion.options.map(subopcion => ({
              label: subopcion.label,
              icon: subopcion.icon,
              routerLink: subopcion.url
            }))
          }
        : {})
    };
  });

  }

  cambiarOpcion() {
    this.opcionUsuario = !this.opcionUsuario;
  }

  cambiarEstado() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.selectedAccordionOption = null;
    this.clearFocus();
  }

  handleToggle(event: any, opcion: any): void {}

  clearFocus(): void {}

  handleOptionClick(event: any, op: any): void {}

  hasSelectedOptions(opciones: any[]): boolean {
    return opciones.some((op) => this.selectedOption === op.titulo);
  }
}