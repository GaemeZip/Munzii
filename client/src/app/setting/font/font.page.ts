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
  selectedFont: number;
  
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.initFont();
     axios.get('http://localhost:3000/readFont')
      .then(res => {        
        for (var i = 0; i < res.data.length ; i++) {
          this.font.f_id = res.data[i].f_id;
          this.font.f_name = res.data[i].f_name;
          this.font.f_family = res.data[i].f_family;
          this.fontList.push([this.font.f_id, this.font.f_name, this.font.f_family]);
        }

      });
  }

  initFont(){
    axios.get('http://localhost:3000/currentFont')
      .then(res => {        
         this.selectedFont = res.data[0].font_id;
      });
  }

  updateFont(f_id) {
    axios.post('http://localhost:3000/updateFont', {
      font_id: f_id,
      u_id: 1
    }).then((res) => {
      console.log(res)
      if (res.data != 'error') {
        console.log("폰트 업데이트");
        console.log(res)
      } else {
        console.log("에러 발생")
      }
    })
  }

  select(id){
    console.log("클릭되었습니다");
    console.log(id);
    this.updateFont(id);    
  }

  prev() {
    this.router.navigate(['/settings']);
  }
}
