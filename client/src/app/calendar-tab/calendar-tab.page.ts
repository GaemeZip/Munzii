import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-calendar-tab',
  templateUrl: './calendar-tab.page.html',
  styleUrls: ['./calendar-tab.page.scss'],
})
export class CalendarTabPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  currentTab: string;

  selected: any;
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
    this.currentTab = 'todo';

    this.selected = new Date('2020-04-02');

    //get date from calendar
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.selected = new Date(this.router.getCurrentNavigation().extras.state.selectDay);
      }
    })
    this.selectYear = this.selected.getFullYear();
    this.selectMonth = this.monthNames[this.selected.getMonth()];
    this.selectDate = this.selected.getDate();
    this.selectDay = this.selected.getDay();

    // ** need ** get start week Day
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

    this.calculateCalendar();
  }
  clickPrevTab() {
    if(this.currentTab == 'timeline') {
      this.currentTab = 'todo';
      this.router.navigateByUrl('/calendar-tab/todo')
    }
    else if(this.currentTab == 'memo') {
      this.currentTab = 'timeline';
      this.router.navigateByUrl('/calendar-tab/timeline')
    }
  }
  clickNextTab() {
    if(this.currentTab == 'timeline') {
      this.currentTab = 'memo';
      this.router.navigateByUrl('/calendar-tab/memo')
    }
    else if(this.currentTab == 'todo') {
      this.currentTab = 'timeline';
      this.router.navigateByUrl('/calendar-tab/timeline')
    }
  }
  openCalendar() {
    this.router.navigateByUrl('home')
  }

  calculateCalendar() {
    console.log(this.selected);
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
      this.weekForSlide[2][i] = new Date();
      this.weekForSlide[2][i].setDate(this.selected.getDate()-(prevDay-i));
      this.weekDateForSlide[2][i] = this.weekForSlide[2][i].getDate();
      // console.log(this.weekForSlide[2][i].getDate());
    }
  }


  endSlide() {
    // console.log("마지막 슬라이든이")
    // this.slides.slideTo(1);
  }
  firstSlide() {
    // console.log("첫 슬라이드")
    // this.slides.slideTo(1);
  }

  changeDay(date) {
    console.log("     요기     "+date )
    // this.calculateSlideWeek(); //슬라이드 위한 날짜 계산 (3주짜리 배열)
  }
}
