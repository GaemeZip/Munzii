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

  doneTodo: number;
  progress: number;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private CalendarTabPage: CalendarTabPage
    ) { 
      this.selected = this.CalendarTabPage.selected;
      this.selectMonth = this.CalendarTabPage.selectMonth;
    }

  ngOnInit() {
    // console.log(this.selected);
  }

  getTodo() {
    console.log("눌렷서용")
    let date: string;
    // date = this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();
    date = '2021-04-17';
    console.log(date);
    axios.get('http://localhost:3000/readTodo',{
      params:{
        date: '2021-04-25',
	      userID: 1
      }
    })
    .then(res => {
        console.log(res.data);
    })

  }
}
