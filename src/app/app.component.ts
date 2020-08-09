import { Component } from '@angular/core';
import { USERS } from './user/fakeuser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularExamApp';
  
  users = USERS;
}
