import { ListOptions } from "../../core/models/listOptions.model";

export const ListaDeOpcionesMenu: ListOptions[] = [
  {
    id: 1,
    icon: "pi pi-home",
    label: "Inicio",
    url: "/dashboard",
    roles: [],
    options: []
  },
  {
    id: 2,
    icon: "pi pi-briefcase", // Mentoría como proceso o actividad profesional
    label: "Mentoria",
    url: "/dashboard/mentoria",
    roles: [],
    options: [
      {
        id: 1,
        icon: "pi pi-user-plus", // Asignación
        label: "Asignación",
        url: "/dashboard/asignacion",
        roles: []
      },
      {
        id: 2,
        icon: "pi pi-file-edit", // Registrar informe
        label: "Registrar Informe",
        url: "/dashboard/alumnos",
        roles: []
      },
      {
        id: 3,
        icon: "pi pi-lightbulb", // Propuestas
        label: "Propuestas",
        url: "/dashboard/alumnos",
        roles: []
      }
    ]
  },
  {
    id: 3,
    icon: "pi pi-search", // Seguimiento / monitoreo
    label: "Seguimiento",
    url: "/dashboard/mentoria",
    roles: [],
    options: [
      {
        id: 2,
        icon: "pi pi-chart-line", // Estado actual
        label: "Estado Actual",
        url: "/dashboard/asignacion",
        roles: []
      }
    ]
  },
  {
    id: 4,
    icon: "pi pi-calendar", // Talleres / eventos
    label: "Talleres",
    url: "/dashboard/mentoria",
    roles: [],
    options: [
      {
        id: 2,
        icon: "pi pi-check-square", // Asistencia
        label: "Asistencia",
        url: "/dashboard/asignacion",
        roles: []
      }
    ]
  },
  {
    id: 5,
    icon: "pi pi-heart", // Voluntariado / acción social
    label: "Voluntariado",
    url: "/dashboard/mentoria",
    roles: [],
    options: [
      {
        id: 2,
        icon: "pi pi-check-square", // Asistencia
        label: "Asistencia",
        url: "/dashboard/asignacion",
        roles: []
      }
    ]
  },
  {
    id: 6,
    icon: "pi pi-graduation-cap", // Certificaciones
    label: "Certificaciones",
    url: "/dashboard/mentoria",
    roles: [],
    options: [
      {
        id: 2,
        icon: "pi pi-send", // Solicitud de certificado
        label: "Solicitud",
        url: "/dashboard/asignacion",
        roles: []
      }
    ]
  }
];
