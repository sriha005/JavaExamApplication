import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../user-service';
import{UserDataService} from '../UserDataService';
import{User,Response,ExamDefinition,UserExam, ExamDefinitionDetails} from '../user'
import { PlatformLocation } from '@angular/common'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  userService:UserService
  route:ActivatedRoute
  router:Router
  dataservice:UserDataService
  exam: ExamDefinition
  count:number
  user:User

  constructor(dataservice:UserDataService, location: PlatformLocation, route: ActivatedRoute, router:Router) {
    this.dataservice = dataservice;
    this.route = route;
    this.router = router;
    location.onPopState(() => {
        console.log('pressed back!');
    });
}
ngOnInit() {
    this.exam = JSON.parse(localStorage.getItem('Array'));
    this.count = JSON.parse(localStorage.getItem('Integer'));
    this.user = JSON.parse(localStorage.getItem('User'));
    //this.exam = this.dataservice.exam;
    //this.count = this.dataservice.count;
    //this.user = this.dataservice.user;
    console.log("correct " + this.count);
}
}
