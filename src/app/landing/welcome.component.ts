import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {UserService} from '../user-service'
import{User} from '../user'
import{UserDataService} from '../UserDataService'
@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent implements OnInit {

  user:User 
  response:User
  route:ActivatedRoute 
  router:Router
  userService: UserService
  dataservice: UserDataService
  invalid: string

  constructor(userService: UserService , route:ActivatedRoute , router:Router,  dataservice:UserDataService) {
    this.userService = userService;
    this.route = route;
    this.router = router;
    this.dataservice = dataservice;
    this.user = new User();
    this.response = new User();
}
ngOnInit() {
    localStorage.removeItem('token');
    localStorage.setItem('token', JSON.stringify(false));
}
ngOnDestroy() {
    this.dataservice.user = this.user;
    localStorage.removeItem('Array');
    localStorage.setItem('Array', JSON.stringify(this.user));
    
}
onSubmit(userForm) {
    this.userService.verifyUser(this.user).subscribe((data:User) => {
        this.response = data;
        if (this.response == null) {
            this.invalid = "username or password is incorrect";
        }
        else {
            this.user.firstname = this.response.firstname;
            this.user.lastname = this.response.lastname;
            this.user.userID = this.response.userID;
            this.invalid = null;
            localStorage.removeItem('token');
            localStorage.setItem('token', JSON.stringify(true));
           
            this.router.navigate(['/userpage']);
        }
    });
    //window.location.reload();
}

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/