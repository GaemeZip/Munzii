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
    axios.get('http://localhost:3000/settings/startDay')
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
    axios.get('http://localhost:3000/settings/startDay/'+localStorage.userID,{
      
    })
      .then(async res => {
        this.selectedDay = res.data[0].start_day_id;
        var elementSelected = document.getElementById(this.selectedDay);
         if(elementSelected == null){
           this.initDay();
           return
         }
         elementSelected.classList.add("selected");
      });
  }

  selectIcon(id) {
    for (let index = 1; index <= this.dayList.length; index++) {
      var numToString = index.toString();
      var elementSelected = document.getElementById(numToString);
      elementSelected.classList.remove("selected");
    }
    var elementSelected = document.getElementById(id);
    elementSelected.classList.add("selected");
  }

  updateStartDay(s_id) {
    axios.put('http://localhost:3000/settings/startDay/'+localStorage.userID, {
      start_day_id: s_id
    }).then((res) => {
      if (res.data != 'error') {
        console.log("폰트 업데이트");
      } else {
        console.log("에러 발생")
      }
    })
  }

  select(id) {
    this.updateStartDay(id); // update db
    this.selectIcon(id); // display munzii
    this.selectedDay = id;
  }

  prev() {
    this.router.navigate(['/settings']);
  }
}
