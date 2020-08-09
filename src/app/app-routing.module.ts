import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {  ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { RegisterComponent } from './register';
import { WelcomeComponent } from './landing';
import {UserpageComponent} from './userpage/userpage.component';
import {ExamComponent} from './exam/exam.component';
import {ResultsComponent} from './results/results.component';


@Injectable({
  providedIn: 'root'
})
export class DirectAccessGuard {
  router:Router
  constructor(router:Router) {
      this.router = router;
  }
  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // If the previous URL was blank, then the user is directly accessing this page
      log: Boolean;
      let log = JSON.parse(localStorage.getItem('token'));
      if (this.router.url === '/' && !log) {
          this.router.navigate(['']); // Navigate away to some other page
          return false;
      }
      return true;
  }
};

@Injectable({
  providedIn: 'root'
})
export class ExamAccessGuard {
  router:Router
  constructor(router:Router) {
      this.router = router;
  }
  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // If the previous URL was blank, then the user is directly accessing this page
      log: Boolean;
      let log = JSON.parse(localStorage.getItem('token'));
      if (this.router.url === '/' && log) {
          this.router.navigate(['userpage']); // Navigate away to some other page
          return false;
      }
      return true;
  }
};











const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'userpage', component: UserpageComponent, canActivate: [DirectAccessGuard] },
    { path: 'exam', component: ExamComponent, canActivate: [DirectAccessGuard, ExamAccessGuard], },
    { path: 'results', component: ResultsComponent, canActivate: [DirectAccessGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ExamAccessGuard, DirectAccessGuard]
})
export class AppRoutingModule { }
