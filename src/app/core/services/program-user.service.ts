import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ProgramUserResponse, AddUserToProgramCommand, DeleteUserFromProgramCommand } from '../models/programUser.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramUserService {
  private api = environment.apiUrl;
  private endpoint = 'program-user';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios de un programa
  getUsersByProgram(idProgram: string): Observable<ProgramUserResponse[]> {
    return this.http.get<ProgramUserResponse[]>(`${this.api}/${this.endpoint}/${idProgram}`);
  }

  // Agregar usuario a un programa
  addUserToProgram(command: AddUserToProgramCommand): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}`, command);
  }

  // Eliminar usuario de un programa (usa POST según tu backend)
  deleteUserFromProgram(command: DeleteUserFromProgramCommand): Observable<void> {
    return this.http.post<void>(
      `${this.api}/${this.endpoint}/delete-from-program/${command.idProgram}`,
      command
    );
  }
}
