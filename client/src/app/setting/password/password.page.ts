import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  windowHeight: number = window.screen.height;
  isOn = false;
  isOff = true;

  constructor(private router: Router) {

  }

  ngOnInit() {
    if (localStorage.passwordState == true) {
      this.isOn = true;
      this.isOff = false;
    } else {
      this.isOn = false;
      this.isOff = true;
    }
    console.log(localStorage.passwordState);
  }

  prev() {
    this.router.navigate(['/settings']);
  }

  moveToPasswordInput() {
    localStorage.passwordMode = 'set';
    this.router.navigate(['/password-input']);
  }

  toggleOnPassword() {
    if (this.isOn == false) {
      this.isOn = true;
      this.isOff = false;
      localStorage.passwordState = this.isOn;
      console.log(localStorage.passwordState);
      localStorage.passwordMode = 'set';
      this.router.navigate(['/password-input']);
    }

  }
  toggleOffPassword() {
    if (this.isOff == false) {
      this.isOn = false;
      this.isOff = true;
      localStorage.passwordState = this.isOn;
      console.log(localStorage.passwordState, "오프 누름")
    }

    //   axios.post('http://3.139.244.188:3000/updatePassword', {
    //     password: null,
    //     userID: 1
    //   }).then((res) => {
    //     if (res.data != 'error') {
    //       console.log("비번 null");
    //     } else {
    //       console.log("에러 발생")
    //     }
    //   })
  }

}
