import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-application-certification',
  imports: [
    DropdownModule,
    CalendarModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    CheckboxModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './application-certification.component.html',
  styleUrl: './application-certification.component.css'
})
export class ApplicationCertificationComponent {
  certificado = {
    tipo: null,
    programa: null,
    fecha: null,
    horas: null
  };

  tiposCertificado = [
    { label: 'Certificado Taller', value: 'Taller' },
    { label: 'Certificado Voluntariado', value: 'Voluntariado' }
  ];

  programas = [
    { label: 'Desarrollo Web con React', value: 'react' },
    { label: 'Introducción a Python', value: 'python' },
    { label: 'Voluntariado Ambiental', value: 'voluntariado' },
    { label: 'Diseño UX/UI', value: 'uxui' }
  ];

  participantes = [
    { nombre: 'Ana María López', codigo: '20210145', estado: 'Completado' },
    { nombre: 'Carlos Mendoza', codigo: '20210146', estado: 'Completado' },
    { nombre: 'María Rodríguez', codigo: '20210147', estado: 'Completado' },
    { nombre: 'Juan Pérez', codigo: '20210148', estado: 'Pendiente' }
  ];

  seleccionados: { nombre: string; codigo: string; estado: string }[] = [];


  seleccionarTodos() {
    this.seleccionados = [...this.participantes];
  }
}
