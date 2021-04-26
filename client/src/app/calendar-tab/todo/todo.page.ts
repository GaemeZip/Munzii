import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalendarTabPage} from '../calendar-tab.page';
import { CreateTodoPage } from '../create-todo/create-todo.page';

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
    public modalController: ModalController,
    private CalendarTabPage: CalendarTabPage) { 
      this.selected = this.CalendarTabPage.selected;
      this.selectMonth = this.CalendarTabPage.selectMonth;
    }

    async presentModal() {
      const modal = await this.modalController.create({
        component: CreateTodoPage,
        animated: true,
        componentProps: { 
          selected: this.selected,
          selectMonth: this.selectMonth
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
  ionViewWillEnter() {
    this.getTodoList();
  }
  editTodo(todo) {
    let index = this.selectDayTodoList.indexOf(todo);
    console.log(index);
    this.ionViewWillEnter();
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
        this.ionViewWillEnter();
        this.ngOnInit();
      } else {
        console.log("에러 발생")
      }
    })

  }
  calculateDone() {
// 누르면 투두 단계 변경 & ㅠㅡ로그레스 계싼하깅
  }
}
