import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  windowHeight: number = window.screen.height;

  constructor(private router: Router) { }
  username: string;
  password: string;

  ngOnInit() {

  }
  async login() {
    const checkLogin = document.getElementById('checkLogin');
    axios.post('http://localhost:3000/users/login', {
      username: this.username,
      password: this.password
    })
      .then((res) => {
        if (res.data == "에러 발생") {
          console.log("에러 발생");
        } else if (res.data == "아이디와 비밀번호 불일치") {
          checkLogin.innerHTML = "아이디 또는 비밀번호가 일치하지 않습니다."
          checkLogin.style.visibility = "visible";
          checkLogin.style.color = "#db1414";
          this.router.navigate(['/login']);
          return;
        }
        else if (res.data == "존재하지 않는 아이디") {
          checkLogin.innerHTML = "아이디 또는 비밀번호가 일치하지 않습니다."
          checkLogin.style.visibility = "visible";
          checkLogin.style.color = "#db1414";
          return;
        }

        localStorage.user = true;
        localStorage.username = res.data[0].username;
        localStorage.userID = res.data[0].u_id;
        console.log(localStorage.userID);
        this.getSetting();
        // location.href = ('/home?1');
      })

  }

  async getSetting() {
    console.log('Sett')
    this.getFont();
    this.initSetting();
    
  }

  getFont(){
    console.log('getfont')
    axios.get('http://3.139.244.188:3000/currentFont', {
      params: {
        userID: localStorage.userID
      }
    })
      .then(res => {
        console.log("받아온 font id 값 : " + res.data[0].font_id);
        localStorage.fontId = res.data[0].font_id;
        this.getTheme();
      });
  }
  getTheme(){
    console.log('gettheme')
    axios.get('http://3.139.244.188:3000/currentTheme', {
      params: {
        userID: localStorage.userID
      }
    })
      .then(res => {
        localStorage.themeId = res.data[0].theme_id;
        console.log("theme id 값 : " + localStorage.themeId);
        this.moveTo();
      });
  }

  async initSetting() {
    console.log('init')

    const change = document.querySelector('body');

    if (localStorage.themeId == null || localStorage.themeId == 1) { // default
      console.log("기본!")
      localStorage.t_primary = '#FFF3A9';
      localStorage.t_check = '#97C1E87E';
      localStorage.t_complete = '#FDE2E2';
      localStorage.t_button = '#F9D667';
      localStorage.t_darkYellow = '#FDE2E2';
      localStorage.t_background = '#FCECB6';
    }

    if (localStorage.themeId == 2) {
      console.log("분홍 먼지!")
      localStorage.t_primary = '#FFD6D6';
      localStorage.t_check = '#FFF0F0';
      localStorage.t_complete = '#F1A0A0';
      localStorage.t_button = '#F1B0B0';
      localStorage.t_darkYellow = '#F2D0D0';
      localStorage.t_background = '#FFD6D6';
    }

    if (localStorage.themeId == 3) {
      console.log("파랑 먼지!")
      localStorage.t_primary = '#DBE8F3';
      localStorage.t_check = '#E4EFFA';
      localStorage.t_complete = '#97C1E8';
      localStorage.t_button = '#ACCBE5';
      localStorage.t_darkYellow = '#BCD9F4';
      localStorage.t_background = '#DBE8F3';
    }

    if (localStorage.themeId == 4) {
      console.log("초록 먼지!")
      localStorage.t_primary = '#B3D9A1';
      localStorage.t_check = '#F5FCF0';
      localStorage.t_complete = '#B3D9A1';
      localStorage.t_button = '#90D371';
      localStorage.t_darkYellow = '#D2F0C4';
      localStorage.t_background = '#CEEDC0';
    }

    if (localStorage.fontId == 1) {
      localStorage.fontId = 1;
      localStorage.f_family = 'NexonGothic';
    }
    if (localStorage.fontId == 2) {
      localStorage.fontId = 2;
      localStorage.f_family = 'PrettyNight';
    }
    if (localStorage.fontId == 3) {
      localStorage.fontId = 3;
      localStorage.f_family = 'DoHyeon';
    }
    if (localStorage.fontId == 4) {
      localStorage.fontId = 4;
      localStorage.f_family = 'PoorStory';
    }
    if (localStorage.fontId == 5) {
      localStorage.fontId = 5;
      localStorage.f_family = 'NexonFootball';
    }

    change.style.setProperty('--ion-font-family', localStorage.f_family);

    change.style.setProperty('--ion-color-primary', localStorage.t_primary);
    change.style.setProperty('--ion-color-check', localStorage.t_check);
    change.style.setProperty('--ion-color-complete', localStorage.t_complete);
    change.style.setProperty('--ion-color-button', localStorage.t_button);
    change.style.setProperty('--ion-color-dark-yellow', localStorage.t_darkYellow);
    change.style.setProperty('--ion-theme-background', localStorage.t_background);

   
  }
  moveTo(){
    console.log('fdfffffd');
    location.href = ('/home');
  }
}

