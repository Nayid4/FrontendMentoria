import { ListOptions } from "../../core/models/listOptions.model";

export const ListaDeOpcionesMenu: ListOptions[] = [
  {
    id: 1,
    icon: "pi pi-home",
    label: "Inicio",
    url: "/dashboard",
    roles: ["Administrador", "Mentor", "Ingresante"],
    options: []
  },
  {
    id: 22,
    icon: "pi pi-briefcase", // Mentoría como proceso o actividad profesional
    label: "Actividad",
    url: "/dashboard/actividad",
    roles: ["Administrador", "Mentor", "Ingresante"],
    options: [
      {
        id: 1,
        icon: "pi pi-user-plus", // Asignación
        label: "Reunion",
        url: "/dashboard/actividad/reunion",
        roles: ["Administrador", "Mentor", "Ingresante"],
      },
      {
        id: 2,
        icon: "pi pi-file-edit", // Registrar informe
        label: "Registrar Taller",
        url: "/dashboard/actividad/registrar-taller",
        roles: ["Administrador", "Mentor", "Ingresante"],
      },
      {
        id: 3,
        icon: "pi pi-lightbulb", // Propuestas
        label: "Asistencia",
        url: "/dashboard/actividad/asistencia",
        roles: ["Administrador", "Mentor", "Ingresante"],
      }
    ]
  },
  {
    id: 226,
    icon: "pi pi-briefcase", // Mentoría como proceso o actividad profesional
    label: "Datos Basicos",
    url: "/dashboard/basicos",
    roles: ["Administrador", "Mentor", "Ingresante"],
    options: [
      {
        id: 1,
        icon: "pi pi-user-plus", // Asignación
        label: "Roles",
        url: "/dashboard/basicos/roles",
        roles: ["Administrador", "Mentor", "Ingresante"],
      },
      {
        id: 2,
        icon: "pi pi-file-edit", // Registrar informe
        label: "Carreras",
        url: "/dashboard/basicos/carreras",
        roles: ["Administrador", "Mentor", "Ingresante"],
      },
      {
        id: 3,
        icon: "pi pi-file-edit", // Registrar informe
        label: "Usuarios",
        url: "/dashboard/basicos/usuarios",
        roles: ["Administrador", "Mentor", "Ingresante"],
      },
      {
        id: 4,
        icon: "pi pi-file-edit", // Registrar informe
        label: "Programas",
        url: "/dashboard/basicos/programas",
        roles: ["Administrador", "Mentor", "Ingresante"],
      }
    ]
  },
  {
    id: 24,
    icon: "pi pi-briefcase", // Mentoría como proceso o actividad profesional
    label: "Reconocimiento",
    url: "/dashboard/reconocimiento",
    roles: ["Administrador", "Mentor", "Ingresante"],
    options: [
      {
        id: 1,
        icon: "pi pi-user-plus", // Asignación
        label: "Puntuacion",
        url: "/dashboard/reconocimiento/puntuacion",
        roles: ["Administrador", "Mentor", "Ingresante"],
      }
    ]
  },
  {
    id: 2,
    icon: "pi pi-briefcase", // Mentoría como proceso o actividad profesional
    label: "Mentoria",
    url: "/dashboard/mentoria",
    roles: ["Administrador", "Mentor", "Ingresante"],
    options: [
      {
        id: 1,
        icon: "pi pi-user-plus", // Asignación
        label: "Asignación",
        url: "/dashboard/mentoria/asignacion",
        roles: ["Administrador", "Mentor", "Ingresante"],
      },
      /*{
        id: 2,
        icon: "pi pi-file-edit", 
        label: "Registrar Informe",
        url: "/dashboard/mentoria/registrar-informe",
        roles: ["Administrador", "Mentor", "Ingresante"],
      },
      {
        id: 3,
        icon: "pi pi-lightbulb", 
        label: "Propuestas",
        url: "/dashboard/mentoria/propuestas",
        roles: ["Administrador", "Mentor", "Ingresante"],
      }*/
    ]
  },
  /*{
    id: 3,
    icon: "pi pi-search", // Seguimiento / monitoreo
    label: "Seguimiento",
    url: "/dashboard/seguimiento",
    roles: ["Administrador", "Mentor", "Ingresante"],
    options: [
      {
        id: 2,
        icon: "pi pi-chart-line", // Estado actual
        label: "Estado Actual",
        url: "/dashboard/seguimiento/estado-actual",
        roles: ["Administrador", "Mentor", "Ingresante"],
      }
    ]
  },*/
  {
    id: 4,
    icon: "pi pi-calendar", // Talleres / eventos
    label: "Talleres",
    url: "/dashboard/taller",
    roles: ["Administrador", "Mentor", "Ingresante"],
    options: [
      {
        id: 2,
        icon: "pi pi-check-square",
        label: "Inicio",
        url: "/dashboard/taller",
        roles: ["Administrador", "Mentor", "Ingresante"],
      },
      {
        id: 2,
        icon: "pi pi-check-square", // Asistencia
        label: "Asistencia",
        url: "/dashboard/taller/asistencia",
        roles: ["Administrador", "Mentor", "Ingresante"],
      }
    ]
  },
  {
    id: 5,
    icon: "pi pi-heart", // Voluntariado / acción social
    label: "Voluntariado",
    url: "/dashboard/voluntariado",
    roles: ["Administrador", "Mentor", "Ingresante"],
    options: [
      {
        id: 2,
        icon: "pi pi-check-square",
        label: "Inicio",
        url: "/dashboard/voluntariado",
        roles: ["Administrador", "Mentor", "Ingresante"],
      },
      {
        id: 2,
        icon: "pi pi-check-square", // Asistencia
        label: "Asistencia",
        url: "/dashboard/voluntariado/asistencia",
        roles: ["Administrador", "Mentor", "Ingresante"],
      }
    ]
  },
  {
    id: 6,
    icon: "pi pi-graduation-cap", // Certificaciones
    label: "Certificaciones",
    url: "/dashboard/certificacion",
    roles: ["Administrador", "Mentor", "Ingresante"],
    options: [
      {
        id: 2,
        icon: "pi pi-send", // Solicitud de certificado
        label: "Solicitud",
        url: "/dashboard/certificacion/solicitud",
        roles: ["Administrador", "Mentor", "Ingresante"],
      }
    ]
  }
];
