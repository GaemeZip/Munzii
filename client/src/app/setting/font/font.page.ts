import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { $ } from 'protractor';

@Component({
  selector: 'app-font',
  templateUrl: './font.page.html',
  styleUrls: ['./font.page.scss'],
})
export class FontPage implements OnInit {
  windowHeight: number = window.screen.height;
  font: {
    f_id: number,
    f_name: string,
    f_family: string
  } = {
      f_id: 0,
      f_name: "",
      f_family: ""
    }
  fontList: any[] = [];
  selectedFont: any;


  constructor(private router: Router) {
  }

  ngOnInit() {
    axios.get('http://localhost:3000/settings/font')
      .then(res => { 
        for (var i = 0; i < res.data.length; i++) {
          this.font.f_id = res.data[i].f_id;
          this.font.f_name = res.data[i].f_name;
          this.font.f_family = res.data[i].f_family;
          this.fontList.push([this.font.f_id, this.font.f_name, this.font.f_family]);
        }
        this.initFont();
      });

  }

  initFont() {
    axios.get('http://localhost:3000/settings/font/:userID',{
      params:{
        userID: localStorage.userID
      }
    })
      .then(async res => {
        console.log("받아온 font id 값 : " + res.data[0].font_id);
        this.selectedFont = res.data[0].font_id;
        localStorage.fontId = res.data[0].font_id;
        localStorage.f_family = this.fontList[res.data[0].font_id - 1][2]
        var elementSelected = document.getElementById(this.selectedFont);
        elementSelected.classList.add("selected");
      });
  }

  selectIcon(id) {
    console.log(id + "가 선택되었습니다")
    for (let index = 1; index <= this.fontList.length; index++) {
      var numToString = index.toString();
      var elementSelected = document.getElementById(numToString);
      elementSelected.classList.remove("selected");
    }
    var elementSelected = document.getElementById(id);
    if (elementSelected == null) {
      this.initFont();
      return
    }
    elementSelected.classList.add("selected");
    const changeFont = document.querySelector('body');
    changeFont.style.setProperty('--ion-font-family', localStorage.f_family);
    
  }

  updateFont(f_id) {
    axios.put('http://localhost:3000/settings/font/:userID', {
      font_id: f_id,
      userID: localStorage.userID
    }).then((res) => {
      if (res.data != 'error') {
        localStorage.fontId = f_id;
        this.initFont();
        console.log("폰트 업데이트");
        console.log(res)
        console.log(f_id + this.fontList[f_id - 1][2]);
      } else {
        console.log("에러 발생")
      }
    })
  }

  select(id) {
    console.log("클릭되었습니다 : " + id);
    this.selectIcon(id); // display munzii
    this.updateFont(id); // update db
    this.selectedFont = id;
    
  }

  prev() {
    location.href = "/settings";
  }
}