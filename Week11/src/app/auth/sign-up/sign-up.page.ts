import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private modalCtrl: ModalController, private authSvc: AuthService) { }

  ngOnInit() {
  }
  onSignUp(f: NgForm) {
    console.log(f.value);
    this.authSvc.signup(f.value.email, f.value.pwd).subscribe(resp => {
      console.log(resp);
      this.modalCtrl.dismiss();
    });
  }
}
