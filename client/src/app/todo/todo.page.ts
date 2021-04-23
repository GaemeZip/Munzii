import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  windowHeight: number = window.screen.height;
  // @ViewChild('slides') slides;
  // @ViewChild('slides', { static: false }) slider: IonSlides;
  weekday: string[]; startWeekDay: number;
  week: Date[] = []; 
  leftDay: number;
  selectDay: Date;
  selectDate: any;
  selectYear: any;
  selectMonth: any;
  monthNames: string[];
  selectWeekday: any;
  doneTodo: number;
  progress: number;

  selectDayTodo: {
    date: Date,
    createdAt: Date,
    title: string,
    time: number,
    startTime: Date,
    endTime: Date,
    userId: string,
    isDone: number 
  } = {
    date: new Date,
    createdAt:  new Date,
    title: ' ',
    time: 0,
    startTime: new Date,
    endTime: new Date,
    userId: ' ',
    isDone: 0
  };
  selectDayTodoList: any [] = [];

  slideWeek: Date[][] = [[],[],[]];
  weekSlideOption = {
    initialSlide: 1
  }

  tempSelectDay: Date;

  constructor(
    private router:Router,
    private route: ActivatedRoute
    ) { 
    // this.monthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  }

  ngOnInit() {
    //get select date from calendar
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.selectDay = new Date(this.router.getCurrentNavigation().extras.state.selectDay);
        console.log(this.selectDay);
      }
    })

    // ** need ** get start week Day
    this.startWeekDay = 0;
    switch(this.startWeekDay) {
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
    
    this.tempSelectDay = new Date('2021-04-02');

    this.calculateSelectDate(this.selectDay);
    this.readTodo(this.selectDay);
    this.calculateViewDay();
    this.calculateSlideWeek(); //슬라이드 위한 날짜 계산 (3주짜리 배열)
  }
  calculateSelectDate(tempSelectDay) {
    //selectday 에 날짜 받ㅇ오기
    this.selectDay = new Date();
    this.selectDay = tempSelectDay;
    // console.log(tempSelectDay + this.selectDay +"  temp랑 selectday")
    // this.selectDay = new Date('2021-04-22'); //readTodo 날짜랑 같아야 함
    this.selectYear = this.selectDay.getFullYear();
    this.selectMonth = this.monthNames[this.selectDay.getMonth()];
    console.log(this.selectMonth + "입니동");
    this.selectDate = this.selectDay.getDate();
    this.selectWeekday = this.selectDay.getDay();
  }
  //selectDay의 주 뽑아오기
  calculateViewDay() {
    this.week = new Array();

    if (this.selectWeekday-this.startWeekDay >= 0) {
      this.leftDay = this.selectWeekday-this.startWeekDay;
    }
    else if (this.selectWeekday-this.startWeekDay < 0) {
      this.leftDay = this.selectWeekday-this.startWeekDay + 7;
    }
    let tempDayPrev: Date;
    let tempDayNext: Date;
    for ( var i = 0; i < 7; i ++) {
      if (i < this.leftDay) {
        tempDayPrev = new Date();
        tempDayPrev.setDate(this.selectDay.getDate()-( this.leftDay - i ));
        console.log("####"+this.selectDay+"####"+this.selectDay.getDate());

        this.week.push(tempDayPrev);
      }
      else if (i == this.leftDay ) {
        this.week.push(this.selectDay);
      }
      else {
        tempDayNext = new Date();
        tempDayNext.setDate(this.selectDay.getMonth() - 1);
        tempDayNext.setDate(this.selectDay.getDate() + (i - this.leftDay));
        this.week.push(tempDayNext);
      }
    }
      // console.log(this.week)
    // console.log(this.week+"셀렉트 한 주 요일들")
  }
  calculateSlideWeek() {
    let tempDayLast: Date = new Date;
    let tempDayWill: Date = new Date;
    for(var i = 0; i < 3; i ++){
      for(var j = 0; j< 7; j ++){
        this.slideWeek[i][j] = null;
      }
    }
    for (var i = 0; i < 7; i ++) {
      tempDayLast = new Date();
      tempDayWill = new Date();

      tempDayLast.setDate(this.week[i].getDate() - 7);
      // console.log(tempDayLast.getDate() + "  last임");
      this.slideWeek[0][i] = tempDayLast;

      this.slideWeek[1][i] = this.week[i];
      // console.log(this.week[i].getDate() + "  현재");

      tempDayWill.setDate(this.week[i].getDate() + 7);
      // console.log(tempDayWill.getDate() + "  will임");
      this.slideWeek[2][i] = tempDayWill;
    }
    // console.log(this.slideWeek);
  }
  calculateProgress() {
    for(var i = 0; i < this.selectDayTodoList.length; i ++) {
      if(this.selectDayTodoList[i].isDone == 1){
        this.doneTodo ++;
      }
    }
    this.progress = this.doneTodo / this.selectDayTodoList.length * 100;
    // console.log(this.selectDayTodoList)
  }
  openCalendar() {
    this.router.navigateByUrl('home')
  }

  endSlide() {
    // console.log("마지막 슬라이든이")
    this.tempSelectDay.setDate(this.selectDay.getDate() +7);
    this.calculateSelectDate(this.tempSelectDay);
    this.readTodo(this.selectDay);
    this.calculateViewDay();
    this.calculateSlideWeek(); //슬라이드 위한 날짜 계산 (3주짜리 배열)
    this.slides.slideTo(1);
  }
  firstSlide() {
    // console.log("첫 슬라이드")
    this.tempSelectDay.setDate(this.selectDay.getDate() -7);
    this.calculateSelectDate(this.tempSelectDay);
    this.readTodo(this.selectDay);
    this.calculateViewDay();
    this.calculateSlideWeek(); //슬라이드 위한 날짜 계산 (3주짜리 배열)
    this.slides.slideTo(1);
  }

  changeDay(date) {
    console.log("     요기     "+date )
    this.calculateSelectDate(date);
    // this.readTodo(this.selectDay);
    this.calculateViewDay();
    // this.calculateSlideWeek(); //슬라이드 위한 날짜 계산 (3주짜리 배열)
  }
  slideChanged(event) {
    console.log(event)
    console.log("푸푸푸푸ㅜ푸푸");

  }
  readTodo(selectDay) {
    // get으로 날짜랑 정보 가져오기 날짜는 셀렉트 데이 정보는 셀렉트 데ㅣㅇ투두
    this.selectDayTodo.date = new Date(selectDay);
    this.selectDayTodo.createdAt = new Date('2021-04-21T03:21:33');
    this.selectDayTodo.title = '밥 먹기';
    this.selectDayTodo.time = 0;
    this.selectDayTodo.userId = 'aaaaa';
    this.selectDayTodo.isDone = 0;
    this.selectDayTodoList.push(this.selectDayTodo);
    // console.log(this.selectDayTodoList.length + "@@@@@@@ selectDay Todolist lengh")
    this.doneTodo = 0;
  }
}
