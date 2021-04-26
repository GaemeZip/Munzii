import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-start-day',
  templateUrl: './start-day.page.html',
  styleUrls: ['./start-day.page.scss'],
})
export class StartDayPage implements OnInit {
  windowHeight: number = window.screen.height;
  day: {
    s_id: number,
    s_day: string
  } = {
      s_id: 0,
      s_day: ""
    }
  dayList: any[] = [];
  selectedDay: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
    axios.get('http://localhost:3000/readStartDay')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.day.s_id = res.data[i].s_id;
          this.day.s_day = res.data[i].s_day;
          this.dayList.push([this.day.s_id, this.day.s_day]);
        }
      });
    this.initDay();
  }

  initDay() {
    axios.get('http://localhost:3000/currentStartDay')
      .then(res => {
        console.log("받아온 font id 값 : " + res.data[0].start_day_id);
        this.selectedDay = res.data[0].start_day_id;
        this.selectIcon(this.selectedDay);
      });
  }

  selectIcon(id) {
    console.log(id + "가 선택되었습니다")
    for (let index = 1; index <= this.dayList.length; index++) {
      var numToString = index.toString();
      var elementSelected = document.getElementById(numToString);
      elementSelected.classList.remove("selected");
    }
    var elementSelected = document.getElementById(id);
    elementSelected.classList.add("selected");
    const changeFont = document.querySelector('body');
    changeFont.style.setProperty('--ion-font-family', this.dayList[id - 1][1]);
  }

  updateStartDay(s_id) {
    axios.post('http://localhost:3000/updateStartDay', {
      start_day_id: s_id,
      u_id: 1
    }).then((res) => {
      console.log(res)
      if (res.data != 'error') {
        console.log("폰트 업데이트");
        console.log(res)
        console.log(s_id + this.dayList[s_id - 1][1]);
      } else {
        console.log("에러 발생")
      }
    })
  }

  select(id) {
    console.log("클릭되었습니다 : " + id);
    this.updateStartDay(id); // update db
    this.selectIcon(id); // display munzii
    this.selectedDay = id;
    //this.initFont();
  }

  prev() {
    this.router.navigate(['/settings']);
  }
}
