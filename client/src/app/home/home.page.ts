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

  themeId: number;

  constructor(
    private router:Router
  )
  
   { 
    console.log(this.windowHeight)
    this.date = new Date();
    this.monthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    
    // console.log(this.currentMonth)
  }

  ngOnInit() {
    this.today = new Date();
    axios.get('http://3.139.244.188:3000/currentTheme',{
      params:{
        userID: localStorage.userID
      }
    })
    .then(res => {        
      this.themeId = res.data[0].theme_id
      localStorage.themeId = res.data[0].theme_id;
    });
    this.getDaysOfMonth();
    // this.getProgress();
    this.currentCalendar = new Date(this.currentYear, this.currentMonth, 0).toISOString();
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    // this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getFullYear() === new Date().getFullYear()) {
      if(this.date.getMonth() === new Date().getMonth()) {
        this.currentDate = new Date().getDate();
       // console.log("@@@@@@"+this.currentDate+"@@@@@@@@@"+new Date().getDate());
      }
      else { 
        this.currentDate = 999;
      }
    } else { 
      this.currentDate = 999;
    }
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay(); //첫 날 요일 
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate(); //전 달 일 수
    
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i); 
    }
  
    this.dayProgress = new Array();
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    // console.log(this.date.getFullYear(), this.date.getMonth()+1)
    // console.log(this.today.getFullYear(), this.today.getMonth()+1)
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
      if(i < this.date.getDate() && this.date.getMonth() == this.today.getMonth() && this.date.getFullYear() == this.today.getFullYear()) {
        this.dayProgress.push(0);
      }
      else if(this.date.getMonth() < this.today.getMonth() && this.currentYear <= this.today.getFullYear()) {
        console.log("@@@@@@@@@")
        this.dayProgress.push(0);
      }
      else {
        this.dayProgress.push(-1);
      }
    }

    this.getProgress();
  }
  async getProgress() {
    await axios.get('http://3.139.244.188:3000/readProgress', {
      params: {
      year: this.currentYear,
      month: this.currentMonth,
      userID: localStorage.userID
    }
    }).then(res => {
      console.log(res.data)
      for(var i =0; i < res.data.length; i++) {
        let tempDate = new Date(res.data[i].date);
        this.dayProgress[tempDate.getDate()-1] = res.data[i].progress;
      }
      // console.log(this.dayProgress)
    })
  }
  selectMonth() {
    this.date = new Date (this.currentCalendar);
    // console.log(this.currentCalendar);
    // console.log(this.date);
    this.getDaysOfMonth();
  }
  openTodo(day) {
    var selectDay = new Date(this.currentCalendar);
    selectDay.setDate(day);
    console.log(selectDay);
    // this.router.navigateByUrl('calendar-tab', NavigationExtras);
    console.log( selectDay.getMonth() + "Aaaa")
    location.href="/calendar-tab/todo?date=" + selectDay.getFullYear() + "-" + this.monthNames[selectDay.getMonth()] + "-" + selectDay.getDate();
    // location.href="/calendar-tab?date=" + ;


  }
  moveToSettings(){
    this.router.navigate(['/settings']);

  }
}
