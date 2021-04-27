import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalendarTabPage} from '../calendar-tab.page';
import { TodoFormPage } from '../todo-form/todo-form.page';
import { TodoEditFormPage } from '../todo-edit-form/todo-edit-form.page';

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

  todoTitle: string;
  todoIsTimeline: number;
  todoStartTime: Date;
  todoEndTime: Date;


  doneTodo: number;
  progress: number;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController,
    private CalendarTabPage: CalendarTabPage) { 
      this.selected = this.CalendarTabPage.selected;
      this.selectMonth = this.CalendarTabPage.selectMonth;
    }

    async createTodo() {
      const modal = await this.modalController.create({
        component: TodoFormPage,
        animated: true,
        componentProps: { 
          selected: this.selected,
          selectMonth: this.selectMonth,
        },
        cssClass: 'modal-custom'
      });
      return await modal.present();
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
  async editTodo(todo) {
    let index = this.selectDayTodoList.indexOf(todo);
    let id = this.selectDayTodoList[index].id;
    console.log(index);
    const modal = await this.modalController.create({
      component: TodoEditFormPage,
      animated: true,
      componentProps: { 
        id: id,
        selected: this.selected,
        selectMonth: this.selectMonth,
        todoTitle: this.selectDayTodoList[index].title,
        todoIsTimeline: this.selectDayTodoList[index].time,
        todoIsDone: this.selectDayTodoList[index].is_done,
        todoStartTime: this.selectDayTodoList[index].start_time,
        todoEndTime: this.selectDayTodoList[index].end_time,
      },
      cssClass: 'modal-custom'
    });
    return await modal.present();
  }
  deleteTodo(todo) {
    let index = this.selectDayTodoList.indexOf(todo);
    let id = this.selectDayTodoList[index].id;
    axios.post('http://3.139.244.188:3000/deleteTodo', {
      id: id,
      userID: 1
    }).then((res) => {
      if (res.data != 'error') {
        console.log("테이블 삭제");
        this.ngOnInit();
      } else {
        console.log("에러 발생")
      }
    })

  }
  calculateDone(todo) {
    if (todo.is_done == 0) {
      todo.is_done = 1;
    }
    else {
      todo.is_done = 0;
    }
    console.log(todo)
    var tempProgress = 0;
    let date= "2021-04-17"
    for (var i=0; i < this.selectDayTodoList.length; i ++) {
      tempProgress += this.selectDayTodoList[i].is_done;
    }
    this.progress = tempProgress / this.selectDayTodoList.length * 100;
    axios.post('http://3.139.244.188:3000/updateTodo', {
      id: todo.id,
      date: date,
      title: todo.title,
      time: todo.time,
      startTime: todo.start_time,
      endTime: todo.end_time,
      isDone: todo.is_done,
      userID: 1
    }).then((res) => {
      if (res.data != 'error') {
        console.log("테이블 업데이트");
      } else {
        console.log("에러 발생")
      }
    })
  }
}
