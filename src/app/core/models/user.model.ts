import { AcademicInformation } from "./academicInformation.model";
import { PersonalInformation } from "./personalInformation.model";
import { Role } from "./role.model";

export interface User {
    id: string;
    role: Role;
    userName: string;
    personalInformation: PersonalInformation;
    academicInformation: AcademicInformation;
}
  
export interface UserCommand {
  role: Role;
  personalInformation: PersonalInformation;
  academicInformation: AcademicInformation;
}
  
  