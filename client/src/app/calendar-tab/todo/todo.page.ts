import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarTabPage} from '../calendar-tab.page';

import axios from 'axios';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  selected: Date;
  selectMonth: string;
  selectDayTodoList: any [] = [];

  doneTodo: number;
  progress: number;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private CalendarTabPage: CalendarTabPage) { 
      this.selected = this.CalendarTabPage.selected;
      this.selectMonth = this.CalendarTabPage.selectMonth;
    }

  ngOnInit() {
    this.progress = 50;
    // console.log(this.selected);
    this.getTodoList();
    console.log(this.selectDayTodoList);
  }

  getTodoList() {
    let date: string;
    // date = this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();
    date = '2021-04-17';
    axios.get('http://3.139.244.188:3000/readTodo',{
      params:{
        date: date,
	      userID: 1
      }
    })
    .then(res => {
      for(var i = 0; i < res.data.length; i++) {
        this.selectDayTodoList[i] = res.data[i];
      }
    })
  }

  createTodo() {
    // axios.post('http://3.139.244.188:3000/createTodo', {
    //   date: '2021-04-22',
    //   title: '예시 투두입니다.',
    //   time: false,
    //   startTime: null,
    //   endTime: null,
    //   userID: 1
    // }).then((res) => {
    //   if (res.data != 'error') {
    //     console.log("테이블 생성");
    //   } else {
    //     console.log("에러 발생")
    //   }
    // })
  }
}
