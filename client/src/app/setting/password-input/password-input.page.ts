import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.page.html',
  styleUrls: ['./password-input.page.scss'],
})
export class PasswordInputPage implements OnInit {
  windowHeight: number = window.screen.height;
  input = '';
  msg = null;
  password = [null, null, null, null];
  passwordStr: String = '';
  passwordNum;
  tempPassword = [];
  keypad = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [null, 0, '<']];
  k;
  n = 0;
  isChecked = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.input = '암호를 입력하세요.';
    axios.get('http://3.139.244.188:3000/readPassword', {
      params: {
        userID: 1
      }
    })
      .then(res => {
        console.log(123);
        console.log(res);
        console.log(123);

        if (res.data != 'error') {
          console.log("패스워드 읽기");
        } else {
          console.log("에러 발생")
        }
      })
  }

  prev() {
    this.password = [null, null, null, null];
    this.tempPassword = [];
    this.n = 0;
    this.router.navigate(['/password']);
  }

  updatePassword() {
    this.makeString();
    axios.post('http://3.139.244.188:3000/updatePassword', {
      password: this.passwordStr,
      userID: 1
    }).then((res) => {
      if (res.data != 'error') {
        console.log("비번업데이트");
      } else {
        console.log("에러 발생")
      }
    })
  }

  pressed(k) {
    if (k == null) {
      return;
    } else if (k == '<') {
      if (this.n == 0) {
        return;
      } else {
        this.password[this.n - 1] = null;
        this.n -= 1;
      }
    } else {
      this.password[this.n] = k;
      this.n += 1;
    }
    this.msg = "";


    if (this.n == 4) {
      if (this.isChecked) {
        this.isChecked = false;

        if (this.tempPassword[0] == this.password[0] && this.tempPassword[1] == this.password[1] && this.tempPassword[2] == this.password[2] && this.tempPassword[3] == this.password[3]) {
          this.updatePassword();
          this.router.navigate(['/password']);

        } else {

          this.input = "암호 불일치!";
          this.msg = "처음부터 다시 입력해주세요";
          this.tempPassword = [];
          this.password = [null, null, null, null];
          this.n = 0;
        }
        
      } else {
        this.tempPassword = this.password;
        this.password = [null, null, null, null];
        this.input = '다시 한 번 입력하세요';
        this.n = 0;
        this.isChecked = true;
      }
    }
  }


  makeString() {
    for (var p in this.password) {
      this.passwordStr += this.password[p];
    }
    this.passwordNum = Number(this.passwordStr);
  }

}
