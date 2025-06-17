export interface ProgramActivityResponse {
  id: string;
  idProgram: string;
  name: string;
  description: string;
  startDate: string; // ISO
  endDate: string;   // ISO
  state: string;
}

export interface AddProgramActivityToProgramCommand {
  idProgram: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  state: string;
}

export interface DeleteProgramActivityFromProgramCommand {
  idProgram: string;
  idProgramActivity: string;
}

export interface ProgramActivityGetByIdQuery {
  idProgram: string;
  idProgramActivity: string;
}
