import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { User,Error,Response,UserExam } from './user';

@Injectable({
    providedIn: 'root'
  })

export class UserService {
    http:HttpClient
    usersUrl:string
    Url:string

    constructor(http:HttpClient) {
        this.http = http;
        this.usersUrl = 'http://localhost:8082/user';
       // this.Url = 'http://192.168.0.165';
        this.Url = 'http://localhost';
    }
    findAll() {
        this.usersUrl = this.Url + ':8082/user';
        return this.http.get(this.usersUrl);
    }
    save(user:User) {
        this.usersUrl = this.Url + ':8082/user/';
        return this.http.post(this.usersUrl, user);
    }
    update(user:User) {
        this.usersUrl = this.Url + ':8082/user';
        return this.http.put(this.usersUrl, user);
    }
    deleteAll() {
        this.usersUrl = this.Url + ':8082/user';
        return this.http.delete(this.usersUrl);
    }
    deletebyId(num:number) {
        this.usersUrl = this.Url + ':8082/user' + num;
        //console.log(this.usersUrl);
        return this.http.delete(this.usersUrl);
    }
    verifyUser(user:User) {
        this.usersUrl = this.Url + ':8082/user/login';
        return this.http.post(this.usersUrl, user);
    }
    getExams() {
        this.usersUrl = this.Url + ':8083/examdefinition/';
        return this.http.get(this.usersUrl);
    }
    sendResp(response:Response) {
        this.usersUrl = this.Url + ':8083/response/';
        return this.http.post(this.usersUrl, response);
    }
    userexamID() {
        this.usersUrl = this.Url + ':8082/userexam/id';
        return this.http.get(this.usersUrl);
    }
    userexam(userexam:UserExam) {
        this.usersUrl = this.Url + ':8082/userexam/';
        return this.http.post(this.usersUrl, userexam);
    }
};