import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-password-enter',
  templateUrl: './password-enter.page.html',
  styleUrls: ['./password-enter.page.scss'],
})
export class PasswordEnterPage implements OnInit {
  windowHeight: number = window.screen.height;
  input: String = "암호를 입력해주세요";
  password = [null, null, null, null];
  keypad = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [null, 0, '<']];
  n = 0;
  numOfWrong =0;
  themeId: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
    axios.get('http://localhost:3000/settings/theme/:userID',{
      params:{
        userID: localStorage.userID
      }
    })
    .then(res => {        
      this.themeId = res.data[0].theme_id;
    });

  }


  enterPassword(k) {
    if (k == null) { // 빈칸 눌렀을 때
      return;
    } else if (k == '<') { // 지우기
      if (this.n == 0) {
        return;
      } else {
        this.password[this.n - 1] = null;
        this.n -= 1;
      }
    } else { // 숫자 눌렀을 때
      this.password[this.n] = k;
      this.n += 1;
    }

    if (this.n == 4) {


      if (localStorage.password == this.password) {
        this.n = 0;
        this.router.navigate(['/home']);


      } else {
        this.input = '다시 시도해주세요';
        this.password = [null, null, null, null];
        this.n = 0;

      }
    }
  }

}
