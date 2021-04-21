import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  windowHeight: number = window.screen.height;
  weekday: string[]; startWeekDay: number;
  week: number[] = []; 
  leftDay: number;
  selectDay: Date;
  selectDate: number;
  selectWeekday: number;
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

  constructor(private router:Router) { }

  ngOnInit() {
    this.startWeekDay = 0;

    this.selectDay = new Date('2021-04-21');
    this.selectDate = this.selectDay.getDate();
    this.selectWeekday = this.selectDay.getDay();
    console.log(this.selectWeekday); //3

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
    this.calculateViewDay();

    console.log(this.week);

    // get으로 날짜랑 정보 가져오기 날짜는 셀렉트 데이 정보는 셀렉트 데ㅣㅇ투두
    this.selectDayTodo.date = new Date('2021-04-21');
    this.selectDayTodo.createdAt = new Date('2021-04-21T03:21:33');
    this.selectDayTodo.title = '밥 먹기';
    this.selectDayTodo.time = 0;
    this.selectDayTodo.userId = 'aaaaa';
    this.selectDayTodo.isDone = 0;

    this.selectDayTodoList.push(this.selectDayTodo);
    this.selectDayTodoList.push(this.selectDayTodo);
    console.log(this.selectDayTodoList.length + "@@@@@@@")
    this.doneTodo = 0;
    for(var i = 0; i < this.selectDayTodoList.length; i ++) {
      if(this.selectDayTodoList[i].isDone == 1){
        this.doneTodo ++;
      }
    }
    this.progress = this.doneTodo / this.selectDayTodoList.length * 100;

    // this.generateList(this.selectDayTodo);
    // this.selectDayTodo.push(this.date, this.createdAt, this.title, this.time, this.startTime, this.endTime, this.userId)
    // this.selectDayTodoList[1] = this.selectDayTodo;
    console.log(this.selectDayTodoList)



  }

  calculateViewDay() {
    if (this.selectWeekday-this.startWeekDay >= 0) {
      this.leftDay = this.selectWeekday-this.startWeekDay;
    }
    else if (this.selectWeekday-this.startWeekDay < 0) {
      this.leftDay = this.selectWeekday-this.startWeekDay + 7;
    }
    for ( var i = 0; i < 7; i ++) {
      if (i < this.leftDay) {
        this.week.push(this.selectDate - ( this.leftDay - i ));
      }
      else if (i == this.leftDay ) {
        this.week.push(this.selectDate);
      }
      else {
        this.week.push(this.selectDate + (i - this.leftDay));
      }
    }
  }
  openCalendar() {
    this.router.navigateByUrl('home')
  }
}
