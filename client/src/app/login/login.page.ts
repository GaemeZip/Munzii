import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: String;
  pass: String;

  constructor(private router: Router) { }
  username: string;
  password: string;

  ngOnInit() {

  }

  login() {
    axios.post('http://localhost:3000/login', {
      username: this.username,
      password: this.password
    })
      .then((res) => {
        console.log(res.data);
        if (res.data == "로그인 성공") {
          alert("로그인 되었습니다");
          this.router.navigate(['/home']);
        }else if (res.data == "아이디와 비밀번호 불일치"){
          alert("비밀번호가 틀렸습니다.");
          this.router.navigate(['/login']);
        }
        else if (res.data == "존재하지 않는 아이디"){
          alert("계정 정보가 없습니다. 회원가입 해주세요");
          this.router.navigate(['/join']);
        }
        console.log(res);
      })
  }
}
