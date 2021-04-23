import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.page.html',
  styleUrls: ['./password-input.page.scss'],
})
export class PasswordInputPage implements OnInit {
  windowHeight: number = window.screen.height;
  input = '';
  password = [1, null, null, null];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.input = '암호를 입력하세요.';

    

    if (this.password[4] != null) {
      this.checkPassword();
    }
  }

  prev() {
    this.router.navigate(['/password']);
  }

  checkPassword() {
    this.input = '암호를 다시 입력하세요.';

  }
}
