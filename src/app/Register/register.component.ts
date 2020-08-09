import { Component } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {UserService} from '../user-service'
import{User, Error} from '../user'


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent 
{

    route:ActivatedRoute 
    router:Router
    userService: UserService
    user:User
    error:Error
    data:User
    constructor(userService:UserService, route:ActivatedRoute, router:Router) {
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.user = new User();
        this.error = new Error();
    }
    ngOnInit() {
    }
    onSubmit(userForm) {
        this.userService.save(this.user).subscribe((data:Error) => {
            console.log(data.response)
            if (data.response != "200 success") {
                this.error = data;
                this.error.response = this.error.response.substr(3, this.error.response.length);
            }
            else {
                this.error.response = "";
            }
            userForm.reset();
        });
    }
}