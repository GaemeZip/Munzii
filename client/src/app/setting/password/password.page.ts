import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    if (localStorage.passwordState == 'true') {
      this.isOn = true;
      this.isOff = false;
    } else {
      this.isOn = false;
      this.isOff = true;
      localStorage.password = null;

    }
  }

  prev() {
    this.router.navigate(['/settings']);
  }

  moveToPasswordInput() {
    if (this.isOff == true) {
      return;
    }
    this.router.navigate(['/password-input']);
  }

  toggleOnPassword() {
    if (this.isOn == false) {
      this.isOn = true;
      this.isOff = false;
      localStorage.passwordState = this.isOn;
      this.router.navigate(['/password-input']);
    } else {
      return;
    }

  }
  toggleOffPassword() {
    if (this.isOff == false) {
      this.isOn = false;
      this.isOff = true;
      localStorage.passwordState = this.isOn;
      localStorage.password = null;

    } else {
      return;
    }

  }

}
