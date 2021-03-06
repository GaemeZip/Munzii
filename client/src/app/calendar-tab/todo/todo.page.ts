import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { CalendarTabPage } from '../calendar-tab.page';
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
  selectDayTodoList: any[] = [];

  todoTitle: string;
  todoIsTimeline: number;
  todoStartTime: Date;
  todoEndTime: Date;

  monthNames: any;
  themeId: number;
  // playAlert
  doneTodo: number;
  progress: number;
  date: any;
  constructor(
    public navCtrl: NavController,
    public modalController: ModalController,
    private CalendarTabPage: CalendarTabPage) {
    this.monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  }

  ngOnInit() {
    let temp = location.href.split("?");
    temp = temp[1].split("=");
    this.date = temp[1];
    this.selected = new Date(this.date);
    this.selectMonth = this.monthNames[this.selected.getMonth()]

    axios.get('http://localhost:3000/settings/theme/:userID', {
      params: {
        userID: localStorage.userID
      }
    })
      .then(res => {
        this.themeId = res.data[0].theme_id;
      });
    this.getTodoList();
  }
  getTodoList() {
    axios.get('http://localhost:3000/todo', {
      params: {
        date: this.date,
        userID: localStorage.userID
      }
    })
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.selectDayTodoList[i] = res.data[i];
        }
        axios.get('http://localhost:3000/progress/' + localStorage.userID, {
          params: {
            date: this.date,
          }
        }).then(res => {
          if (res.data.length === 0) {
            axios.post('http://localhost:3000/progress', {
              date: this.date,
              userID: localStorage.userID
            }).then((res) => {
              let today = new Date();
              if (today.getFullYear() == this.selected.getFullYear() && today.getMonth() == this.selected.getMonth() && today.getDate() >= this.selected.getDate()) {
                axios.put('http://localhost:3000/progress', {
                  date: this.date,
                  progress: 0,
                  userID: localStorage.userID
                }).then((res) => {
                })
              }
              else if (today.getFullYear() == this.selected.getFullYear() && today.getMonth() > this.selected.getMonth()) {
                axios.put('http://localhost:3000/progress', {
                  date: this.date,
                  progress: 0,
                  userID: localStorage.userID
                }).then((res) => {
                })
              }
              else if (today.getFullYear() > this.selected.getFullYear()) {
                axios.put('http://localhost:3000/progress', {
                  date: this.date,
                  progress: 0,
                  userID: localStorage.userID
                }).then((res) => {
                })
              }
            })
          }
          else {
            this.calculateProgress();
          }
        })
      })
  }
  async createTodo() {
    const modal = await this.modalController.create({
      component: TodoFormPage,
      animated: true,
      componentProps: {
        time: 0,
        selected: this.selected,
        selectMonth: this.selectMonth,
      },
      cssClass: 'modal-custom'
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        location.href = "/calendar-tab/todo?date=" + this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();
      }
    });
    return await modal.present();
  }

  async editTodo(todo) {
    let index = this.selectDayTodoList.indexOf(todo);
    let id = this.selectDayTodoList[index].id;
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
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        location.href = "/calendar-tab/todo?date=" + this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();
      }
    });

    return await modal.present();
  }
  deleteTodo(todo) {
    let index = this.selectDayTodoList.indexOf(todo);
    let id = this.selectDayTodoList[index].id;
    axios.delete('http://localhost:3000/todo', {
      params: {
        id: id,

        userID: localStorage.userID
      }
    }).then((res) => {
      if (res.data != 'error') {
        console.log("????????? ??????");
      } else {
        console.log("?????? ??????")
      }
      location.href = "/calendar-tab/todo?date=" + this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();

    })
  }
  calculateProgress() {
    let today = new Date();
    if (this.selectDayTodoList.length !== 0 || (this.selected <= today)) {

      var tempProgress = 0;
      for (var i = 0; i < this.selectDayTodoList.length; i++) {
        tempProgress += this.selectDayTodoList[i].is_done;
      }
      if (tempProgress === 0) {
        this.progress = 0;
      }
      else {
        this.progress = tempProgress / this.selectDayTodoList.length * 100;
      }
      axios.put('http://localhost:3000/progress', {
        date: this.date,
        progress: this.progress,

        userID: localStorage.userID
      }).then((res) => {
      })
    }
  }
  calculateDone(todo) {
    if (todo.is_done == 0) {
      todo.is_done = 1;
    }
    else {
      todo.is_done = 0;
    }
    this.calculateProgress();
    axios.put('http://localhost:3000/todo', {
      id: todo.id,
      date: this.date,
      title: todo.title,
      time: todo.time,
      startTime: todo.start_time,
      endTime: todo.end_time,
      isDone: todo.is_done,

      userID: localStorage.userID
    }).then((res) => {
      if (res.data != 'error') {
        console.log("????????? ????????????");
      } else {
        console.log("?????? ??????")
      }
    })
  }
}
