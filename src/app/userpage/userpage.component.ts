import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {UserService} from '../user-service';
import{UserDataService} from '../UserDataService';
import{User, ExamDefinition} from'../user';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  route:ActivatedRoute 
  router:Router
  userService: UserService
  dataservice: UserDataService
  user:User
  examDefinition:ExamDefinition[]

  constructor(userService:UserService, route:ActivatedRoute, router:Router, dataservice: UserDataService) {
    this.userService = userService;
    this.route = route;
    this.router = router;
    this.dataservice = dataservice;
    
}

ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User'));
    // this.user=this.dataservice.user;
    this.userService.getExams().subscribe((data:ExamDefinition[]) => {
        this.examDefinition = data;
        
    });
   // console.log("examid: " + this.examDefinition[1].examId)
}
onSubmit(id:number) {
    localStorage.removeItem('Array');
    localStorage.setItem('Array', JSON.stringify(this.examDefinition[id - 1]));
   // console.log("examid: " + this.examDefinition[1].examId)
    localStorage.removeItem('User');
    localStorage.setItem('User', JSON.stringify(this.user));
    this.dataservice.exam = this.examDefinition[id - 1];
    this.router.navigate(['./exam'], { skipLocationChange: true });
}
}
