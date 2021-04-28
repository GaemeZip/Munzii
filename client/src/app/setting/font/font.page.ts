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
  font:{
    f_id: number,
    f_name: string,
    f_family: string
  } = {
    f_id: 0,
    f_name: "",
    f_family: ""
  }
  fontList: any[] =[];
  selectedFont: any;
  
  
  constructor(private router: Router) {
  }

  ngOnInit() {
     axios.get('http://3.139.244.188:3000/readFont')
      .then(res => {        
        for (var i = 0; i < res.data.length ; i++) {
          this.font.f_id = res.data[i].f_id;
          this.font.f_name = res.data[i].f_name;
          this.font.f_family = res.data[i].f_family;
          this.fontList.push([this.font.f_id, this.font.f_name, this.font.f_family]);
        }
      });
      this.initFont();
  }

  initFont(){
    axios.get('http://3.139.244.188:3000/currentFont')
      .then(res => {        
        console.log("받아온 font id 값 : "+res.data[0].font_id);
        
         this.selectedFont = res.data[0].font_id;
         this.selectIcon(this.selectedFont);
      });
      
  }

  selectIcon(id){
    console.log(id+"가 선택되었습니다")
    for (let index = 1; index <= this.fontList.length; index++) {
      var numToString = index.toString();
      var elementSelected = document.getElementById(numToString);
      elementSelected.classList.remove("selected");
    }
    var elementSelected = document.getElementById(id);
    elementSelected.classList.add("selected");
    const changeFont = document.querySelector('body');
    changeFont.style.setProperty('--ion-font-family', this.fontList[id-1][2]);
  }

  updateFont(f_id) {
    axios.post('http://3.139.244.188:3000/updateFont', {
      font_id: f_id,
      u_id: 1
    }).then((res) => {
      //console.log(res)
      if (res.data != 'error') {
        console.log("폰트 업데이트");
        console.log(res)
        console.log(f_id+this.fontList[f_id-1][2]);
      } else {
        console.log("에러 발생")
      }
    })
  }

  select(id){
    console.log("클릭되었습니다 : " + id);
    this.updateFont(id); // update db
    this.selectIcon(id); // display munzii
    this.selectedFont = id;
    //this.initFont();
  }

  prev() {
    this.router.navigate(['/settings']);
  }
}