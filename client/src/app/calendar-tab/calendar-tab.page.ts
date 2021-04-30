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
    this.currentTab = 'todo';

    this.selected = new Date();
    this.selected.setDate(this.selected.getDate()+7);
    //get date from calendar
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        // console.log(this.router.getCurrentNavigation().extras.state.selectDay);
        this.selected = new Date(this.router.getCurrentNavigation().extras.state.selectDay);
        this.paramSelected = new Date(this.router.getCurrentNavigation().extras.state.selectDay);
        this.selected.setDate(this.selected.getDate()+7);
        // this.selected.setDate(this.selected.getDate()-7);
      }
      
    })

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
    let NavigationExtras: NavigationExtras = {
      state: {
        selected: this.selected
      }
    };
    if(this.currentTab == 'timeline') {
      this.currentTab = 'todo';
      this.router.navigateByUrl('/calendar-tab/todo', NavigationExtras);
    }
    else if(this.currentTab == 'memo') {
      this.currentTab = 'timeline';
      this.router.navigateByUrl('/calendar-tab/timeline', NavigationExtras);
    }
  }
  clickNextTab() {
    let NavigationExtras: NavigationExtras = {
      state: {

        selected: this.selected
      }
    };
    if(this.currentTab == 'timeline') {
      this.currentTab = 'memo';
      this.router.navigateByUrl('/calendar-tab/memo', NavigationExtras);
    }
    else if(this.currentTab == 'todo') {
      this.currentTab = 'timeline';
      this.router.navigateByUrl('/calendar-tab/timeline', NavigationExtras);
    }
  }
  openCalendar() {

    this.router.navigateByUrl('home')
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
  }
  firstSlide() {
    let tempDay = new Date(this.selected); 

    tempDay.setDate(this.selected.getDate() - 7);
    this.getDate(tempDay);
    this.calculateCalendar(tempDay);
    this.slides.slideTo(1);
  }

  changeDay(date) {
    // console.log(date)
    // console.log(this.selected);
    this.selected.setDate(date);
    this.getDate(this.selected);
    this.calculateCalendar(this.selected);
  }
  moveToSettings(){
    this.router.navigate(['/settings']);

  }
}
