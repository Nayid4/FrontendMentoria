// core/models/mentor-assignment.model.ts

import { User } from "./user.model";

export interface MentorAssignmentResponse {
  id: string;
  mentor: User;
  user: User;
}

export interface MentorAssignmentUsersResponse {
  id: string;
  mentor: User;
  users: User[];
}

// Commandos
export interface MentorAssignmentCreateCommand {
  idMentor: string;
  idUser: string;
}
export interface MentorAssignmentUpdateCommand {
  id: string;
  idMentor: string;
  idUser: string;
}
export interface MentorAssignmentsGetByUserQuery {
  idUser: string;
}
export interface MentorAssignmentsGetByMentorQuery {
  idMentor: string;
}
export interface MentorAssignmentAutomaticCommand {} // Puede ir vacío o con campos si el backend los pide
