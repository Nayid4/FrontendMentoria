import { Injectable } from '@angular/core';
import { Career, CareerCommand } from '../models/career.model';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CareerService  extends GenericService<Career, CareerCommand> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "career";
  }
}