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
  standalone: true,
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
    tipo: null as string | null,
    programa: null as string | null,
    fecha: null as Date | null,
    horas: null as number | null
  };

  tiposCertificado = [
    { label: 'Certificado Taller', value: 'Taller' },
    { label: 'Certificado Voluntariado', value: 'Voluntariado' }
  ];

  programas = [
    { label: 'Desarrollo Web con React', value: 'Desarrollo Web con React' },
    { label: 'Introducción a Python', value: 'Introducción a Python' },
    { label: 'Voluntariado Ambiental', value: 'Voluntariado Ambiental' },
    { label: 'Diseño UX/UI', value: 'Diseño UX/UI' }
  ];

  participantes = [
    { nombre: 'Ana María López', codigo: '20210145', estado: 'Completado' },
    { nombre: 'Carlos Mendoza', codigo: '20210146', estado: 'Completado' },
    { nombre: 'María Rodríguez', codigo: '20210147', estado: 'Completado' },
    { nombre: 'Juan Pérez', codigo: '20210148', estado: 'Pendiente' }
  ];

  seleccionados: { nombre: string; codigo: string; estado: string }[] = [];
  seleccionadoParaVista: { nombre: string; codigo: string; estado: string } | null = null;

  seleccionarTodos(): void {
    this.seleccionados = [...this.participantes];
    this.seleccionadoParaVista = this.seleccionados.length > 0 ? this.seleccionados[0] : null;
  }

  cambiarVistaManual(participante: { nombre: string; codigo: string; estado: string }): void {
    this.seleccionadoParaVista = participante;
  }
}
