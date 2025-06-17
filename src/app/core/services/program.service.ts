// program.service.ts
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { ProgramResponse, ProgramCommand } from '../models/program.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramService extends GenericService<ProgramResponse, ProgramCommand> {

  constructor(http: HttpClient) {
    super(http);
    this.endpoint = "program";
  }
}
