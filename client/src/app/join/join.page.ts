import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { $ } from 'protractor';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {

  constructor(private router: Router) { }
  username: string;
  password: string;
  passwordConfirmation: string;
  canJoin = false;
  idCheck = false;
  checkIdText = document.getElementById('checkIdText');

  // reload(){
  //   $("beforeJoin".load(window.location.href + "beforeJoin"));
  // }
  join() {
    console.log(this.username);
    const beforeJoin = document.getElementById('beforeJoin');
    if (this.idCheck == false && this.username != null && this.password != null && this.passwordConfirmation != null) {
      beforeJoin.innerHTML="아이디 중복 체크를 해주세요";
      beforeJoin.style.visibility = "visible";
      beforeJoin.style.color = "#db1414";
      return
    }

    else if (this.idCheck == true && this.password != this.passwordConfirmation) {
      beforeJoin.innerHTML="입력하신 비밀번호가 불일치 합니다";
      beforeJoin.style.visibility = "visible"
      beforeJoin.style.color = "#db1414";
      this.router.navigate(['/join']);
      return
    }


    axios.post('http://3.139.244.188:3000/join', {
      username: this.username,
      password: this.password
    })
      .then((res) => {
        
        console.log(res.data);
        if (res.data == "회원가입 성공") {
          alert("회원가입 성공! 로그인 후 이용해주세요");
          this.router.navigate(['/login']);
        }
        else if (res.data == "양식을 모두 채워주세요") {
          beforeJoin.innerHTML="양식을 모두 채워주세요";
          beforeJoin.style.visibility = "visible"
          beforeJoin.style.color = "#db1414";
          this.router.navigate(['/join']);
        }
        console.log(res);
      })
  }

  checkId(inputname) {
    this.checkUser(inputname);
  }

  checkUser(inputname) {
    axios.post('http://3.139.244.188:3000/checkUser', {
      username: inputname
    })
      .then((res) => {
        console.log(res.data);
        const checkIdText = document.getElementById('checkIdText');
        if (res.data.length == 0) {
          if (inputname != null) {
            checkIdText.innerHTML="사용 가능한 아이디 입니다.";
            checkIdText.style.visibility = "visible";
            checkIdText.style.color = "#1649CD";
            this.canJoin = true;
            this.idCheck = true;
          }
          else if(inputname == null){
            checkIdText.innerHTML="사용하실 아이디를 입력해주세요";
            checkIdText.style.visibility = "visible";
            checkIdText.style.color = "#db1414";
          }
        }
        else {
          checkIdText.innerHTML="사용 중인 아이디 입니다.";
          checkIdText.style.visibility = "visible"
          checkIdText.style.color = "#db1414";
        }
      })
  }
  login(){
    this.router.navigate(['/login']);
  }
  ngOnInit() {

  }

}