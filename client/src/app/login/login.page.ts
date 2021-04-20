import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:String;
  pass:String;

  constructor() { }

  ngOnInit() {
  }

  signIn() {
    console.log('Username: ', this.user, 'Password: ', this.pass)
  }

}
