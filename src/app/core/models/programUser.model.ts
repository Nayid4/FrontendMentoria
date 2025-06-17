// program-user.model.ts

export interface ProgramUserResponse {
  personalInformation: PersonalInformationResponse;
  role: RoleResponse;
  academicInformation: AcademicInformationResponse;
  userName: string;
  state: string; // "Aceptado" o "Pendiente"
}

export interface RoleResponse {
  id: string;
  name: string;
}

export interface PersonalInformationResponse {
  id: string;
  dni: string;
  name: string;
  lastName: string;
  sex: string;
  phone: string;
}

export interface AcademicInformationResponse {
  id: string;
  code: string;
  email: string;
  career: CareerResponse;
  cicle: number;
  expectative: string;
}

export interface CareerResponse {
  id: string;
  name: string;
}

// Comando para agregar usuario a un programa
export interface AddUserToProgramCommand {
  idProgram: string;
  idUser: string;
}

// Comando para eliminar usuario de un programa
export interface DeleteUserFromProgramCommand {
  idProgram: string;
  idUser: string;
}
