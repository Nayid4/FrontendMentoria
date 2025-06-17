// program.model.ts
import { Career } from './career.model';

export interface ProgramResponse {
  id: string;
  career: Career;
  name: string;
  type: string;
  description: string;
  maximumNumberOfParticipants: number;
}

export interface ProgramCommand {
  idCareer: string;
  name: string;
  type: string;
  description: string;
  maximumNumberOfParticipants: number;
}
