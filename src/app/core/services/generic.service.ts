import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T, Tl> {

  protected api: string = environment.apiUrl
  protected endpoint: string = ''

  private UpdateSource = new BehaviorSubject<T | null>(null);
  Updated$ = this.UpdateSource.asObservable();

  private RegistroSource = new BehaviorSubject<Tl | null>(null);
  Registro$ = this.RegistroSource.asObservable();

  constructor(protected http: HttpClient) { }

  GetAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.api}/${this.endpoint}`);
  }

  GetById(id: string): Observable<T>{
    return this.http.get<T>(`${this.api}/${this.endpoint}/${id}`);
  }

  Create(data: Tl): Observable<void>{
    return this.http.post<void>(`${this.api}/${this.endpoint}`, data);
  }

  Update(id: string, data: T): Observable<void>{
    return this.http.put<void>(`${this.api}/${this.endpoint}/${id}`, data);
  }

  Delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.api}/${this.endpoint}/${id}`);
  }


  notifyUpdate(entidad: T) {
    this.UpdateSource.next(entidad);
  }

  notifyRegistro(entidad: Tl) {
    
    this.RegistroSource.next(entidad);
  }
}
