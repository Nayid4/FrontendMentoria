import { Injectable, signal } from '@angular/core';
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

  career = signal<Career[]>([]);

  getCareer() : Career[] {
    return this.career();
  }
  
  setCareer(career: Career[]) {
    this.career.set(career);
  }
}