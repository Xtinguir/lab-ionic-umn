import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private router: Router, private authSvc: AuthService) { }

  ngOnInit() {
    this.authSvc.isAuthenticated.subscribe(resp => {
      if (resp) {
        console.log('User is authenticated');
        this.router.navigateByUrl('/home');
      } else {
        console.log('No user');
      }
    });
  }
  onSignUp(f: NgForm) {
    console.log(f.value);
    this.authSvc.signup(f.value.email, f.value.pwd).subscribe(resp => {
      console.log(resp);
    });
  }
  onLogin(f: NgForm) {
    this.authSvc.login(f.value.email, f.value.pwd).subscribe(
        resp => {
          if (resp.idToken) {
            console.log(resp);
            this.router.navigateByUrl('/home');
          } else {
            console.log('login failed');
          }
        },
        errorResp => {
          console.log(errorResp);
        }
    );
  }

}
