import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  ProgramActivityResponse,
  AddProgramActivityToProgramCommand,
  DeleteProgramActivityFromProgramCommand,
  ProgramActivityGetByIdQuery
} from '../models/programActivity.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramActivityService {
  private api = `${environment.apiUrl}/program-activity`;

  constructor(private http: HttpClient) {}

  getAll(idProgram: string): Observable<ProgramActivityResponse[]> {
    return this.http.get<ProgramActivityResponse[]>(`${this.api}/${idProgram}`);
  }

  add(command: AddProgramActivityToProgramCommand): Observable<void> {
    return this.http.post<void>(this.api, command);
  }

  delete(command: DeleteProgramActivityFromProgramCommand): Observable<void> {
    return this.http.post<void>(
      `${this.api}/delete-from-program/${command.idProgram}`,
      command
    );
  }

  getById(query: ProgramActivityGetByIdQuery): Observable<ProgramActivityResponse> {
    return this.http.post<ProgramActivityResponse>(
      `${this.api}/get-by-id-activity/${query.idProgram}`,
      query
    );
  }

  update(command: ProgramActivityResponse): Observable<void> {
    return this.http.put<void>(`${this.api}/${command.id}`, command);
  }
}
