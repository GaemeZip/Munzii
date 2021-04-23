import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  windowHeight: number = window.screen.height;

  currentCalendar: any;
  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  // daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;

  //level1 ,2, 3, 4
  dayMunzzi: string;


  constructor(
    private router:Router
  ) { 
    console.log(this.windowHeight)
    this.date = new Date();
    this.monthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    this.getDaysOfMonth();
    this.currentCalendar = new Date(this.currentYear, this.currentMonth, 0).toISOString();
    console.log(this.currentCalendar)
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
  
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }
  
    // var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    // for (var i = 0; i < (6-lastDayThisMonth); i++) {
    //   this.daysInNextMonth.push(i+1);
    // }
    // var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    // if(totalDays<36) {
    //   for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
    //     this.daysInNextMonth.push(i);
    //   }
    // }
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
    let NavigationExtras: NavigationExtras = {
      state: {
        selectDay: selectDay
      }
    };
    this.router.navigateByUrl('todo', NavigationExtras);
  }
  moveToSettings(){
    this.router.navigate(['/settings']);

  }
}
