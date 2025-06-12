import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { ChangeState, User, UserCommand } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User, UserCommand> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "user";
  }


  changeState(changeState: ChangeState): Observable<void> {
    return this.http.put<void>(`${this.api}/${this.endpoint}/change-state/${changeState.id}`, changeState)
  }
}
