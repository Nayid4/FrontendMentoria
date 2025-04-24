import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { User, UserCommand } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User, UserCommand> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "user";
  }
}
