import { Injectable } from '@angular/core';
import { Role, RoleCommand } from '../models/role.model';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends GenericService<Role, RoleCommand> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "role";
  }
}
