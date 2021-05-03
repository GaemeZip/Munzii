import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import axios from 'axios';
import { DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-todo-edit-form',
  templateUrl: './todo-edit-form.page.html',
  styleUrls: ['./todo-edit-form.page.scss'],
})
export class TodoEditFormPage implements OnInit {
  selectedString: string = "";
  selected: Date;
  selectMonth: string;
  title: string;
  startTime: any;
  endTime: any;
  startTimeString: any;
  endTimeString: any;
  isTimeline: any;
  todoId: number;
  isDone: number;

  constructor(
    private router: Router,
    private navParams: NavParams, 
    public navCtrl: NavController,
    private modalController: ModalController,
    public datePipe: DatePipe
    ) {
      this.todoId = navParams.get('id');
      this.selected = navParams.get('selected');
      this.selectMonth = navParams.get('selectMonth');
      this.title = navParams.get('todoTitle');
      this.isTimeline = navParams.get('todoIsTimeline');
      this.startTime = navParams.get('todoStartTime');
      this.endTime = navParams.get('todoEndTime');
      this.startTimeString = this.startTime;
      this.endTimeString = this.endTime;
      this.isDone = navParams.get('todoIsDone');
     }

  ngOnInit() {
    console.log(this.title, this.isTimeline, this.startTime, this.endTime)
    this.selectedString = this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();
  }
  refresh() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  gogo() {
    console.log("눌림")
  }
  timeActive() {
    if (this.isTimeline == 0) {
      this.isTimeline = 1;
    }
    else {
      this.isTimeline = 0;
    }
  }
  updateTodo() {
    // this.selectedString='2021-04-17';
    if(this.isTimeline == 0) {
      this.startTimeString ="00:00:00"
      this.endTimeString ="00:00:00"
    }
    if(this.title == "" || this.title == null) {
      alert("일정을 입력하세요")
    }
    else {
      if (this.isTimeline == 1) {
        if(this.startTime == null || this.endTime == null) {
          alert("시간을 입력하세요")
        }
        else if(this.startTime.length < 10) {
          if (Number(this.startTime.substr(0,2)) > Number(this.endTime.substr(0,2))) {
            alert("시작 시간은 종료 시간 이전이어야 합니다");
          }
          else if (Number(this.startTime.substr(0,2)) === Number(this.endTime.substr(0,2))) {
            if(Number(this.startTime.substr(3,2)) < Number(this.endTime.substr(3,2))) {
              alert("시작 시간은 종료 시간 이전이어야 합니다");
            }
          }
          else {
            axios.post('http://3.139.244.188:3000/updateTodo', {
              id: this.todoId,
              date: this.selectedString,
              title: this.title, 
              time: this.isTimeline,
              startTime: this.startTimeString,
              endTime: this.endTimeString,
              isDone: this.isDone,
              userID: localStorage.userID
            }).then((res) => {
              if (res.data != 'error') {
                console.log("테이블 업데이트");
              } else {
                console.log("에러 발생")
              }
            })
            this.modalController.dismiss({
              'dismissed': true
            });
          }
        }
        else if(new Date(this.startTime).getHours() > new Date(this.endTime).getHours()) {
          alert("시작 시간은 종료 시간 이전이어야 합니다");
        }
        else if (new Date(this.startTime).getHours() === new Date(this.endTime).getHours()) {
          if(new Date(this.startTime).getMinutes() > new Date(this.endTime).getMinutes()) {
            alert("시작 시간은 종료 시간 이전이어야 합니다");
          }
        }
        else {
          axios.post('http://3.139.244.188:3000/updateTodo', {
            id: this.todoId,
            date: this.selectedString,
            title: this.title, 
            time: this.isTimeline,
            startTime: this.startTimeString,
            endTime: this.endTimeString,
            isDone: this.isDone,
            userID: localStorage.userID
          }).then((res) => {
            if (res.data != 'error') {
              console.log("테이블 업데이트");
            } else {
              console.log("에러 발생")
            }
          })
          this.modalController.dismiss({
            'dismissed': true
          });
        }
      }
      else {
        axios.post('http://3.139.244.188:3000/updateTodo', {
          id: this.todoId,
          date: this.selectedString,
          title: this.title, 
          time: this.isTimeline,
          startTime: this.startTimeString,
          endTime: this.endTimeString,
          isDone: this.isDone,
          userID: localStorage.userID
        }).then((res) => {
          if (res.data != 'error') {
            console.log("테이블 업데이트");
          } else {
            console.log("에러 발생")
          }
        })
      this.modalController.dismiss({
        'dismissed': true
      });
      }
    }
  }
  calculateStartTime() {
    console.log(this.startTime, typeof this.startTime)
    if(this.startTime.length < 10) {
      this.startTimeString = this.startTime;
    }
    else {
      let temp = new Date(this.startTime);
      console.log(temp, typeof temp);
      this.startTimeString = this.datePipe.transform(temp, 'HH:mm:ss');
    }
    console.log(this.startTimeString, typeof this.startTimeString);
  }
  calculateEndTime() {
      if(this.endTime.length < 10) {
        this.endTimeString = this.endTime;
      }
      else {
        let temp = new Date(this.endTime);
        this.endTimeString = this.datePipe.transform(temp, 'HH:mm:ss');
      }
  }
}
