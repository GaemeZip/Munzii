import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

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

  join() {
    console.log(this.username);


    if (this.password != this.passwordConfirmation) {
      alert('입력하신 비밀번호가 불일치 합니다');
      this.router.navigate(['/join']);
      return
    }

    if (this.idCheck == false) {
      alert('아이디 중복 체크를 해주세요')
      return
    }

    axios.post('http://localhost:3000/join', {
      username: this.username,
      password: this.password
    })
      .then((res) => {
        console.log(res.data);
        if (res.data == "회원가입 성공") {
          alert("회원가입 성공");
          this.router.navigate(['/login']);
        }

        else if (res.data == "양식을 모두 채워주세요") {
          alert("양식을 모두 채워주세요");
          this.router.navigate(['/join']);
        }
        console.log(res);
      })
  }

  checkId(inputname) {
    this.checkUser(inputname);
  }

  checkUser(inputname) {
    axios.post('http://localhost:3000/checkUser', {
      username: inputname
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.length == 0) {
          if (inputname != null) {
            alert('사용 가능한 아이디 입니다.')
            this.canJoin = true;
            this.idCheck = true;
          }
          else {
            alert("사용하실 아이디를 입력해주세요")
          }
        }
        else {
          alert('이미 가입된 아이디 입니다.')
          location.reload();
        }
      })
  }

  ngOnInit() {
    // const get = document.getElementById('comparePassword');
    // if(this.password == null){
    //   get.innerHTML="비밀번호를 입력해주세요."
    // }
    // else if(this.password != null && this.password == this.passwordConfirmation){
    //   get.innerHTML="비밀번호가 일치합니다."
    // }
    // else if(this.password != this.passwordConfirmation){
    //   get.innerHTML="비밀번호가 불일치합니다."
    // }

  }

}
