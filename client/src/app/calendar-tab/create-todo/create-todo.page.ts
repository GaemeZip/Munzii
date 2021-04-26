import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {
  title: string;
  startTime: any;
  endTime: any;

  constructor() { }

  ngOnInit() {
  }

  dismiss() {

  }
  createTodo() {

  }
}
