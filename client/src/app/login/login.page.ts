import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }
  username: string;
  password: string;

  ngOnInit() {

  }

  login() {
    const checkLogin = document.getElementById('checkLogin');
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
          //checkLogin.innerHTML="비밀번호가 틀렸습니다.";
          checkLogin.innerHTML="아이디 또는 비밀번호가 일치하지 않습니다."
          checkLogin.style.visibility = "visible";
          checkLogin.style.color = "#db1414";
          this.router.navigate(['/login']);
        }
        else if (res.data == "존재하지 않는 아이디"){
          //checkLogin.innerHTML="계정 정보가 없습니다. 회원가입 해주세요";
          checkLogin.innerHTML="아이디 또는 비밀번호가 일치하지 않습니다."
          checkLogin.style.visibility = "visible";
          checkLogin.style.color = "#db1414";
        }
        console.log(res);
      })
  }
}


