import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MentorAssignmentCreateCommand, MentorAssignmentResponse, MentorAssignmentsGetByUserQuery, MentorAssignmentUpdateCommand, MentorAssignmentUsersResponse } from '../models/mentorAssignment.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MentorAssignmentService {

  private api = `${environment.apiUrl}/mentor-assignment`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MentorAssignmentResponse[]> {
    return this.http.get<MentorAssignmentResponse[]>(`${this.api}`);
  }

  getById(id: string): Observable<MentorAssignmentResponse> {
    return this.http.get<MentorAssignmentResponse>(`${this.api}/${id}`);
  }

  create(cmd: MentorAssignmentCreateCommand): Observable<void> {
    return this.http.post<void>(`${this.api}`, cmd);
  }

  update(id: string, cmd: MentorAssignmentUpdateCommand): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, cmd);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  getByUser(idUser: string): Observable<MentorAssignmentUsersResponse> {
    return this.http.get<MentorAssignmentUsersResponse>(`${this.api}/get-by-user/${idUser}`);
  }

  getByMentor(idMentor: string): Observable<MentorAssignmentUsersResponse> {
    return this.http.get<MentorAssignmentUsersResponse>(`${this.api}/get-by-mentor/${idMentor}`);
  }

  // Asignación automática
  assignAutomatic(): Observable<void> {
    return this.http.get<void>(`${this.api}/assignment-automatic`);
  }
}
