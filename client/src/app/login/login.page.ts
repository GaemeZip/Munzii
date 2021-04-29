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
8619
  login() {
    const checkLogin = document.getElementById('checkLogin');
    axios.post('http://3.139.244.188:3000/login', {
      username: this.username,
      password: this.password
    })
      .then((res) => {
        if (res.data == "에러 발생") {
          console.log("에러 발생");
        }else if (res.data == "아이디와 비밀번호 불일치"){
          checkLogin.innerHTML="아이디 또는 비밀번호가 일치하지 않습니다."
          checkLogin.style.visibility = "visible";
          checkLogin.style.color = "#db1414";
          this.router.navigate(['/login']);
          return;
        }
        else if (res.data == "존재하지 않는 아이디"){
          checkLogin.innerHTML="아이디 또는 비밀번호가 일치하지 않습니다."
          checkLogin.style.visibility = "visible";
          checkLogin.style.color = "#db1414";
          return;
        }

        localStorage.user = true;
        localStorage.username = res.data[0].username;
        localStorage.userID = res.data[0].u_id;
        console.log(localStorage.userID);
        this.router.navigate(['/home']);
      })
  }
}


