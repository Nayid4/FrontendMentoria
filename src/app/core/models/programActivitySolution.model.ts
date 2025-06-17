export interface ProgramActivitySolutionResponse {
  id: string;
  idProgramActivity: string;
  idUser: string;
  idFileSolution: string;
  calification: number;
}

export interface AddSolutionToProgramActivityCommand {
  idProgramActivity: string;
  idUser: string;
  idFileSolution: string;
}

export interface DeleteSolutionCommand {
  idProgramActivity: string;
  idProgramActivitySolution: string;
}

export interface ActivitySolutionGetByIdUserQuery {
  idProgramActivity: string;
  idUser: string;
}

export interface ActivitySolutionUpdateCalificationCommand {
  idProgramActivity: string;
  idProgramActivitySolution: string;
  calification: number;
}
