import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit {
  windowHeight: number = window.screen.height;
  theme:{
    t_id: number,
    t_name: string,
    t_primary: string,
    t_check: string,
    t_complete: string,
    t_button: string,
    t_modify: string,
    t_background: string
  } = {
    t_id: 0,
    t_name: "",
    t_primary: "",
    t_check: "",
    t_complete: "",
    t_button: "",
    t_modify: "",
    t_background: ""
  }
  themeList: any[] =[];
  selectedTheme: any;

  constructor(private router: Router) { }

  ngOnInit() {
    axios.get('http://localhost:3000/readTheme')
      .then(res => {        
        for (var i = 0; i < res.data.length ; i++) {
          this.theme.t_id = res.data[i].t_id;
          this.theme.t_name = res.data[i].t_name;
          this.theme.t_primary = res.data[i].t_primary;
          this.theme.t_check = res.data[i].t_check;
          this.theme.t_complete = res.data[i].t_complete;
          this.theme.t_button = res.data[i].t_button;
          this.theme.t_modify = res.data[i].t_modify;
          this.theme.t_background = res.data[i].t_background;

          this.themeList.push([this.theme.t_id, this.theme.t_name, this.theme.t_primary, this.theme.t_check,this.theme.t_complete, this.theme.t_button, this.theme.t_modify, this.theme.t_background]);
        }
        console.log(this.themeList);
      });
      this.initTheme();
  }

  initTheme(){
    axios.get('http://localhost:3000/currentTheme')
      .then(res => {        
        console.log("받아온 theme id 값 : "+res.data[0].theme_id);
         this.selectedTheme = res.data[0].theme_id;
         this.selectIcon(this.selectedTheme);
      });
  }

  selectIcon(id){
    console.log(id+"가 선택되었습니다")
    for (let index = 1; index <= this.themeList.length; index++) {
      var numToString = index.toString();
      var elementSelected = document.getElementById(numToString);
      elementSelected.classList.remove("selected");
    }
    var elementSelected = document.getElementById(id);
    elementSelected.classList.add("selected");
    const changeTheme = document.querySelector('body');
    changeTheme.style.setProperty('--ion-color-primary', this.themeList[id-1][2]);
    changeTheme.style.setProperty('--ion-color-check', this.themeList[id-1][3]);
    changeTheme.style.setProperty('--ion-color-complete', this.themeList[id-1][4]);
    changeTheme.style.setProperty('--ion-color-button', this.themeList[id-1][5]);
    changeTheme.style.setProperty('--ion-color-dark-yellow', this.themeList[id-1][6]);
    changeTheme.style.setProperty('--ion-theme-background', this.themeList[id-1][7]);
  }

  updateTheme(t_id) {
    axios.post('http://localhost:3000/updateTheme', {
      theme_id: t_id,
      u_id: 1
    }).then((res) => {
      console.log(res)
      if (res.data != 'error') {
        console.log("테마 업데이트");
        console.log(res)
        console.log(t_id+this.themeList[t_id-1][2]);
      } else {
        console.log("에러 발생")
      }
    })
  }

  select(id){
    console.log("클릭되었습니다 : " + id);
    this.updateTheme(id); // update db
    this.selectIcon(id); // display munzii
    this.selectedTheme = id;
    //this.initFont();
  }

  prev(){
    this.router.navigate(['/settings']);
  }

}
