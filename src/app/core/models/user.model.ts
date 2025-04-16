export interface User {
    id: string;
    role: Role;
    userName: string;
    personalInformation: PersonalInformation;
    academicInformation: AcademicInformation;
  }
  
  export interface Role {
    id: string;
    name: string;
  }
  
  export interface PersonalInformation {
    dni: string;
    name: string;
    lastName: string;
    sex: string;
    phone: string;
  }
  
  export interface AcademicInformation {
    code: string;
    email: string;
    career: Career;
    cicle: number;
    expectative: string;
  }
  
  export interface Career {
    id: string;
    name: string;
  }
  