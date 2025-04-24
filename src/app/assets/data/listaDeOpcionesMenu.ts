import { ListOptions } from "../../core/models/listOptions.model";

export const ListaDeOpcionesMenu: ListOptions[] = [
    {
      id: 1,
      icon: "pi pi-home", // icon de Inicio
      label: "Inicio",
      url: "/dashboard",
      roles: [],
      options: []
    },
    {
      id: 2,
      icon: "pi pi-tags", // icon de Género
      label: "Género",
      url: "/dashboard/genero",
      roles: [],
      options: []
    },
    {
      id: 3,
      icon: "pi pi-globe", // icon de País
      label: "País",
      url: "/dashboard/pais",
      roles: [],
      options: []
    },
    {
      id: 4,
      icon: "pi pi-user", // icon de Actor
      label: "Actor",
      url: "/dashboard/actor",
      roles: [],
      options: []
    },
    {
      id: 5,
      icon: "pi pi-video", // icon de Director
      label: "Director",
      url: "/dashboard/director",
      roles: [],
      options: []
    },
    {
      id: 6,
      icon: "pi pi-users", // icon de Usuario
      label: "Usuario",
      url: "/dashboard/usuario",
      roles: [],
      options: []
    },
    {
      id: 7, // Cambié el ID duplicado
      icon: "pi pi-video", // icon de Película
      label: "Película",
      url: "/dashboard/pelicula",
      roles: [],
      options: []
    }
];
