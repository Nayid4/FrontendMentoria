import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ListOptions } from '../../../core/models/listOptions.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ListaDeOpcionesMenu } from '../../../assets/data/listaDeOpcionesMenu';


@Component({
  selector: 'app-side-menu-dashboard',
  imports: [
    AccordionModule, 
    CommonModule, 
    RouterModule,
    Menu
  ],
  templateUrl: './side-menu-dashboard.component.html',
  styleUrl: './side-menu-dashboard.component.css'
})
export class SideMenuDashboardComponent  implements OnInit {
  @Input() isMenuVisible!: boolean;
  @Output() toggleMenu = new EventEmitter<void>();

  selectedOption: string | null = "Inicio";
  selectedAccordionOption: string | null = null;
  opcionUsuario: boolean = false;
  listaOpciones: ListOptions[] = ListaDeOpcionesMenu;

  items: MenuItem[] | undefined;


  ngOnInit(): void {
    this.items = ListaDeOpcionesMenu.map(opcion => ({
      label: opcion.label,
      icon: opcion.icon,
      routerLink: opcion.url
    }));
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

  handleToggle(event: any, opcion: any): void {
    
  }

  clearFocus(): void {
    
  }

  handleOptionClick(event: any, op: any): void {
    
  }

  hasSelectedOptions(opciones: any[]): boolean {
    return opciones.some(op => this.selectedOption === op.titulo);
  }
}