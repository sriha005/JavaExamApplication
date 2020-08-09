import {NgModule, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../user-service';
import{UserDataService} from '../UserDataService';
import{User,Response,ExamDefinition,UserExam, ExamDefinitionDetails} from '../user'
import {MatSelectModule } from '@angular/material/select';
import { mobiscroll } from '@mobiscroll/angular-lite';

mobiscroll.settings = {
    theme: 'auto'
};


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {


    
  userService:UserService
  route:ActivatedRoute
  router:Router
  dataservice:UserDataService
  count:number
  selectedValue: string
  correct:number
  response:Response[]
  userexam: UserExam
  exam:ExamDefinition
  user:User
  options:string[]
  userExamID:number
  res:Response

  constructor(userService:UserService, route:ActivatedRoute, router:Router, dataservice:UserDataService) {
    this.userService = userService;
    this.route = route;
    this.router = router;
    this.dataservice = dataservice;
    this.count = 0;
    this.selectedValue = ' ';
    this.correct = 0;
    this.response = new Array();
    this.userexam = new UserExam();
}

ngOnInit() {
    this.exam = JSON.parse(localStorage.getItem('Array'));
    //console.log("exam: " + this.exam.examId)
    // this.exam = this.dataservice.exam;
    this.exam.questions = this.shuffle(this.exam.questions);
    this.options = this.exam.questions[this.count].questionOptions.split("$");
    this.user = JSON.parse(localStorage.getItem('User'));
    this.userService.userexamID().subscribe((data:number) => {
        this.userExamID = data;
    });
}
shuffle(array:ExamDefinitionDetails[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
clickCount() {
    {
        {
            console.log(this.selectedValue);
        }
    }
    {
        {
            console.log(this.selectedValue[0]);
        }
    }
    this.res = new Response();
    if (this.selectedValue[0] == this.exam.questions[this.count].questionAnswer) {
        this.correct++;
        this.res.correct = true;
    }
    else {
        this.res.correct = false;
    }
    this.res.questionID = this.exam.questions[this.count].qid;
    this.res.userResponse = this.selectedValue;
    console.log("user exam id " + this.userExamID);
    this.res.userExamID = this.userExamID;
    console.log(this.res.questionID);
    this.response[this.count] = this.res;
    this.count++;
    this.selectedValue = ' ';
    if (this.count < this.exam.questions.length) {
        this.options = this.exam.questions[this.count].questionOptions.split("$");
    }
    else {
        localStorage.removeItem('Array');
        localStorage.setItem('Array', JSON.stringify(this.exam));
        localStorage.removeItem('Integer');
        localStorage.setItem('Integer', JSON.stringify(this.correct));
        this.dataservice.count = this.correct;
        console.log("user exam id " + this.userExamID);
        this.userexam.userExamID = this.userExamID;
        this.userexam.userID = this.user.userID;
        this.userexam.examID = this.exam.examId;
        this.userexam.score = this.correct;
        let grade;
        grade = (this.correct / this.response.length) * 100;
        if (grade < 60) {
            this.userexam.grade = "F";
        }
        else if (grade < 70) {
            this.userexam.grade = "D";
        }
        else if (grade < 80) {
            this.userexam.grade = "C";
        }
        else if (grade < 90) {
            this.userexam.grade = "B";
        }
        else {
            this.userexam.grade = "A";
        }
        console.log("userid" + this.exam.examId);
        this.userService.userexam(this.userexam).subscribe();
        for (let i = 0; i < this.response.length; i++) {
            console.log(this.response[i].userExamID);
            this.userService.sendResp(this.response[i]).subscribe();
        }
        this.router.navigate(['./results']);
    }
}



}
