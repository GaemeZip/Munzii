import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-calendar-tab',
  templateUrl: './calendar-tab.page.html',
  styleUrls: ['./calendar-tab.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class CalendarTabPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  currentTab: string;

  public paramSelected: any;
  public selected: any;
  selectYear: any;
  selectMonth: any;
  selectDate: any;
  selectDay: any;
  monthNames: any;

  selectWeekday: any;
  leftDay: number;

  startWeekday: number;
  weekday: any;

  weekForSlide: Date[][] = [[],[],[]];
  weekDateForSlide: number[][] = [[],[],[]];
  
  weekSlideOption = {
    initialSlide: 1
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.monthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
     }

  ngOnInit() {
    let temp = location.href.split("?");
    let tempTab = temp[0].split("/");
    this.currentTab = tempTab[4];

    console.log(tempTab)
    temp = temp[1].split("=");
    let tempDate = temp[1];
    this.selected = new Date(tempDate);
    console.log(this.selected)

    // this.selected = new Date();
    this.selected.setDate(this.selected.getDate()+7);

    // ** need ** get start week Day
    axios.get('http://3.139.244.188:3000/currentStartDay')
      .then(res => {
        this.startWeekday = res.data[0].start_day_id;
        this.startWeekday = 0;
        switch(this.startWeekday) {
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
    // console.log(this.selected)
    this.getDate(this.selected)
    this.calculateCalendar(this.selected);

    });
    
  }
  clickPrevTab() {
    if(this.currentTab == 'timeline') {
      this.currentTab = 'todo';
      location.href="/calendar-tab/todo?date=" + this.selectYear + "-" + this.selectMonth + "-" + this.selectDate;
    }
    else if(this.currentTab == 'memo') {
      this.currentTab = 'timeline';
      location.href="/calendar-tab/timeline?date=" + this.selectYear + "-" + this.selectMonth + "-" + this.selectDate;
    }
  }
  clickNextTab() {
    if(this.currentTab == 'timeline') {
    console.log(11)

      this.currentTab = 'memo';
      location.href="/calendar-tab/memo?date=" + this.selectYear + "-" + this.selectMonth + "-" + this.selectDate;
    }
    else if(this.currentTab == 'todo') {
    console.log(12317462876)

      this.currentTab = 'timeline';
      location.href="/calendar-tab/timeline?date=" + this.selectYear + "-" + this.selectMonth + "-" + this.selectDate;
    }
  }
  openCalendar() {
    location.href="/home";
  }
  getDate(tempDay) {
    this.paramSelected = new Date(tempDay);
    this.selected = new Date(tempDay);
    this.selectYear = this.selected.getFullYear();
    this.selectMonth = this.monthNames[this.selected.getMonth()];
    this.selectDate = this.selected.getDate();
    this.selectDay = this.selected.getDay();
    // console.log(this.selected,this.selectYear,this.selectMonth,this.selectDate,this.selectDay);
  }

  calculateCalendar(tempDay) {
    // this.selected = new Date(tempDay)
    var prevDay;

    if ( this.startWeekday > this.selectDay) {
      prevDay = (7 + this.startWeekday - this.selectDay);
    }
    else {
      prevDay = (this.selectDay - this.startWeekday);
    }
    for (let i = 7; i > 0; i --) {
      this.weekForSlide[0][7-i] = new Date();
      this.weekForSlide[0][7-i].setDate(this.selected.getDate()-(prevDay+i));
      this.weekDateForSlide[0][7-i] = this.weekForSlide[0][7-i].getDate();
      // console.log(this.weekForSlide[0][i]);
    }
    for (let i = 0; i < 7; i ++) {
      this.weekForSlide[1][i] = new Date();
      this.weekForSlide[1][i].setDate(this.selected.getDate()-(prevDay-i));
      this.weekDateForSlide[1][i] = this.weekForSlide[1][i].getDate();
      // console.log(this.weekForSlide[1][i]);
    }
    for (let i = 7; i < 14; i ++) {
      this.weekForSlide[2][i-7] = new Date();
      this.weekForSlide[2][i-7].setDate(this.selected.getDate()-(prevDay-i));
      this.weekDateForSlide[2][i-7] = this.weekForSlide[2][i-7].getDate();
      // console.log(this.weekForSlide[2][i].getDate());
    }
  }

  endSlide() {
    // console.log("마지막 슬라이든이")
    let tempDay = new Date(this.selected);                               
    tempDay.setDate(this.selected.getDate() + 7);            
    this.getDate(tempDay);
    this.calculateCalendar(tempDay);
    this.slides.slideTo(1);
    this.refreshPage();
  }
  firstSlide() {
    let tempDay = new Date(this.selected); 

    tempDay.setDate(this.selected.getDate() - 7);
    this.getDate(tempDay);
    this.calculateCalendar(tempDay);
    this.slides.slideTo(1);
    // this.refreshPage();
  }

  changeDay(date) {
    let dateDifference = this.selected.getDate()-date;
    let tempDay = new Date(this.selected);

    //눌렀을때 다음달인 경우  -> 28 1 2 3 4 5 6   23 24 25 26 27 28 1 (22)  
    if(dateDifference > 20) {
      tempDay.setDate(date);
      tempDay.setMonth(this.selected.getMonth()+1);    
    }
    //눌ㅇ렀을때 저번달 (-22) 
    else if(dateDifference < -20) {
      tempDay.setDate(date);
      tempDay.setMonth(this.selected.getMonth()-1);    
    }
    else {
      tempDay.setDate(date);    
    }
    this.getDate(tempDay);
    this.calculateCalendar(tempDay);
    this.refreshPage();
  }
  refreshPage() {
    if(this.currentTab == 'todo') {
      this.currentTab = 'todo';
      location.href="/calendar-tab/todo?date=" + this.selectYear + "-" + this.selectMonth + "-" + this.selectDate;
    }
    else if(this.currentTab == 'timeline') {
      this.currentTab = 'timeline';
      location.href="/calendar-tab/todo?timeline=" + this.selectYear + "-" + this.selectMonth + "-" + this.selectDate;
    }
    // else {
    //   this.currentTab = 'memo';
    //   location.href="/calendar-tab/memo?date=" + this.selectYear + "-" + this.selectMonth + "-" + this.selectDate;
    // }
  }
  moveToSettings(){
    this.router.navigate(['/settings']);

  }
}
