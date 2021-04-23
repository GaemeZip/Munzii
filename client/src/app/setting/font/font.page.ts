import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-font',
  templateUrl: './font.page.html',
  styleUrls: ['./font.page.scss'],
})
export class FontPage implements OnInit {
  windowHeight: number = window.screen.height;
  f_name: string[] = [];
  
  constructor(private router: Router) {
  }

  ngOnInit() {
     axios.get('http://localhost:3000/readFont')
      .then(res => {
        console.log(res.data);
        var someElement= document.getElementsByClassName("item");
        for (var i = 0; res.data.length; i++) {
          this.f_name[i] = res.data[i].f_name;
        }
      });
  }

  updateFont() {
    axios.post('http://localhost:3000/updateFont', {
      font_id: 3,
      u_id: 1
    }).then((res) => {
      console.log(res)
      if (res.data != 'error') {
        console.log("폰트 업데이트");
      } else {
        console.log("에러 발생")
      }
    })
  }

  select(){
    console.log("클릭되었습니다");
    const content = document.getElementsByClassName
  }

  prev() {
    this.router.navigate(['/settings']);
  }
}
