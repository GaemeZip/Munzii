import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  windowHeight: number = window.screen.height;

  today: any;
  currentCalendar: any;
  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  // daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  dayProgress: any;
  //level1 ,2, 3, 4
  dayMunzzi: string;

  startWeekday: number;
  weekday: any;

  themeId: number;

  constructor(
    private router: Router
  ) {
    this.date = new Date();
    this.monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  }

  ngOnInit() {

    this.today = new Date();
    axios.get('http://localhost:3000/settings/theme/' + localStorage.userID, {
    }).then(res => {
      this.themeId = res.data[0].theme_id
      localStorage.themeId = res.data[0].theme_id;
    });

    axios.get('http://localhost:3000/settings/startDay/' + localStorage.userID, {
    })
      .then(res => {
        if (res.data[0].start_day_id == 7) {
          this.startWeekday = 0;
        }
        else {
          this.startWeekday = res.data[0].start_day_id;
        }
        switch (this.startWeekday) {
          case 0: {
            this.weekday = ['일', '월', '화', '수', '목', '금', '토'];
            break;
          }
          case 1: {
            this.weekday = ['월', '화', '수', '목', '금', '토', '일'];
            break;
          }
          case 2: {
            this.weekday = ['화', '수', '목', '금', '토', '일', '월'];
            break;
          }
          case 3: {
            this.weekday = ['수', '목', '금', '토', '일', '월', '화'];
            break;
          }
          case 4: {
            this.weekday = ['목', '금', '토', '일', '월', '화', '수'];
            break;
          }
          case 5: {
            this.weekday = ['금', '토', '일', '월', '화', '수', '목'];
            break;
          }
          case 6: {
            this.weekday = ['토', '일', '월', '화', '수', '목', '금'];
            break;
          }
        }

        this.getDaysOfMonth(this.startWeekday);
        this.currentCalendar = new Date(this.currentYear, this.currentMonth, 0).toISOString();
      })

  }

  getDaysOfMonth(startWeekday) {
    this.startWeekday = startWeekday;
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getFullYear() === new Date().getFullYear()) {
      if (this.date.getMonth() === new Date().getMonth()) {
        this.currentDate = new Date().getDate();
      }
      else {
        this.currentDate = 999;
      }
    } else {
      this.currentDate = 999;
    }
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay(); //첫 날 요일 
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate(); //전 달 일 수

    for (var i = prevNumOfDays - (firstDayThisMonth - 1 - startWeekday); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    this.dayProgress = new Array();
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();

    this.getProgress(thisNumOfDays);
  }
  async getProgress(thisNumOfDays) {
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i + 1);
      this.dayProgress.push(-1);
      if (this.date.getMonth() < this.today.getMonth() && this.date.getFullYear() == this.today.getFullYear()) {
        this.dayProgress[i] = 0;
      }
      if (this.date.getFullYear() < this.today.getFullYear()) {
        this.dayProgress[i] = 0;
      }
      if (this.date.getMonth() == this.today.getMonth() && i < this.today.getDate()) {
        this.dayProgress[i] = 0;
      }
    }
    await axios.get('http://localhost:3000/progress', {
      params: {
        year: this.currentYear,
        month: this.currentMonth,
        userID: localStorage.userID
      }
    }).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        let tempDate = new Date(res.data[i].date);
        this.dayProgress[tempDate.getDate() - 1] = res.data[i].progress;
      }
    })
  }
  selectMonth() {
    this.date = new Date(this.currentCalendar);
    this.date.setDate(this.date.getDate() - 10);
    this.getDaysOfMonth(this.startWeekday);
  }
  openTodo(day) {
    var selectDay = new Date(this.currentCalendar);
    selectDay.setDate(day);
    location.href = "/calendar-tab/todo?date=" + selectDay.getFullYear() + "-" + this.monthNames[selectDay.getMonth()] + "-" + selectDay.getDate();
  }
  moveToSettings() {
    this.router.navigate(['/settings']);

  }
}
