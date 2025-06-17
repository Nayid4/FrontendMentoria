// program-activity-solution.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  ProgramActivitySolutionResponse,
  AddSolutionToProgramActivityCommand,
  DeleteSolutionCommand,
  ActivitySolutionGetByIdUserQuery,
  ActivitySolutionUpdateCalificationCommand
} from '../models/programActivitySolution.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramActivitySolutionService {
  private api = `${environment.apiUrl}/program-activity-solution`;

  constructor(private http: HttpClient) { }

  getAll(idProgramActivity: string): Observable<ProgramActivitySolutionResponse[]> {
    return this.http.get<ProgramActivitySolutionResponse[]>(`${this.api}/${idProgramActivity}`);
  }

  create(command: AddSolutionToProgramActivityCommand): Observable<void> {
    return this.http.post<void>(this.api, command);
  }

  delete(command: DeleteSolutionCommand): Observable<void> {
    return this.http.post<void>(`${this.api}/delete-from-activity/${command.idProgramActivity}`, command);
  }

  getById(query: ActivitySolutionGetByIdUserQuery): Observable<ProgramActivitySolutionResponse> {
    return this.http.post<ProgramActivitySolutionResponse>(`${this.api}/get-by-id-activity/${query.idProgramActivity}`, query);
  }

  updateCalification(command: ActivitySolutionUpdateCalificationCommand): Observable<void> {
    return this.http.post<void>(`${this.api}/update-calification/${command.idProgramActivity}`, command);
  }
}
