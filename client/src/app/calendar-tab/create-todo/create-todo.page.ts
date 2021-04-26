import { Component, OnInit } from '@angular/core';
import { start } from 'node:repl';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {
  title: string;
  startTime: any;
  endTime: any;
  isTimeline: any;

  constructor() { }

  ngOnInit() {
    this.isTimeline = 0;
  }

  dismiss() {

  }
  createTodo() {
    // console.log(this.startTime, this.endTime)
    console.log("눌려라")
  }
  merong() {
    console.log(123131231)
  }
  timeActive() {
    if (this.isTimeline == 0) {
      this.isTimeline = 1;
    }
    else {
      this.isTimeline = 0;
    }
  }
}
