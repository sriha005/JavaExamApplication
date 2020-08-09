import { Injectable } from '@angular/core';
import { User, ExamDefinition } from './user';

@Injectable({
    providedIn: 'root'
  })

  export class UserDataService {

    user:User
    exam:ExamDefinition
    count:number
  }
