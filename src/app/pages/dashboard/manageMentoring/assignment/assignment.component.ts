import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-assignment',
  standalone: true,
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.css',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule
  ]
})
export class AssignmentComponent {
  filtro = '';
  
  showDialog = false;
formulario: any = {};
indiceActual: number | null = null;


  asignaciones = [
    {
      mentor: 'Carlos Rodríguez',
      ingresante: 'Ana Martínez',
      estado: 'Activa',
      asignacion: '14/10/2023',
      ultima: '19/11/2023',
      fecha: '24/11/2023',
      hora: '15:30',
      lugar: 'Biblioteca Central, Sala 3'
    },
    {
      mentor: 'Carlos Rodríguez',
      ingresante: 'Pedro Sánchez',
      estado: 'Activa',
      asignacion: '14/10/2023',
      ultima: '19/11/2023',
      fecha: '24/11/2023',
      hora: '15:30',
      lugar: 'Biblioteca Central, Sala 3'
    }
  ];

  agregarAsignacion() {
    this.asignaciones.push({
      mentor: 'Nuevo Mentor',
      ingresante: 'Nuevo Ingresante',
      estado: 'Pendiente',
      asignacion: new Date().toLocaleDateString(),
      ultima: '-',
      fecha: '-',
      hora: '-',
      lugar: '-'
    });
  }

  eliminarAsignacion(index: number) {
    if (confirm('¿Estás seguro de eliminar esta asignación?')) {
      this.asignaciones.splice(index, 1);
    }
  }

  get asignacionesFiltradas() {
    return this.asignaciones.filter(a =>
      a.mentor.toLowerCase().includes(this.filtro.toLowerCase()) ||
      a.ingresante.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

editarAsignacion(asignacion: any, index: number) {
  this.formulario = { ...asignacion };
  this.indiceActual = index;
  this.showDialog = true;
}

guardarEdicion() {
  if (this.indiceActual !== null) {
    this.asignaciones[this.indiceActual] = { ...this.formulario };
  }
  this.showDialog = false;
}

}
