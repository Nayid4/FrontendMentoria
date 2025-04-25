import { Injectable, signal } from '@angular/core';
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

  private nombreRol: string = '';

  role = signal<Role[]>([]);

  getRole() : Role[] {
    return this.role();
  }
  
  setRole(role: Role[]) {
    this.role.set(role);
  }
}
