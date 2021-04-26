import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {
  selectedString: string = "";
  selected: Date;
  selectMonth: string;
  title: string;
  startTime: any;
  endTime: any;
  isTimeline: any;

  constructor(
    private router: Router,
    private navParams: NavParams, 
    public navCtrl: NavController,
    private modalController: ModalController
  ) { 
    this.selected = navParams.get('selected');
    this.selectMonth = navParams.get('selectMonth');
  }

  ngOnInit() {
    this.isTimeline = 0;
    this.title = null;
    this.startTime=null;
    this.endTime=null;
    this.selectedString = this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();
  }
  refresh() {
    this.modalController.dismiss({
      'dismissed': true
    });

  }

  createTodo() {
    this.selectedString='2021-04-17';
    // console.log(this.selectedString)
    // console.log(this.startTime, this.endTime)
    if(this.title==null) {
      alert("일정을 입력하세요")
    }
    else {
      if (this.isTimeline == 1) {
        if(this.startTime == null || this.endTime == null) {
          alert("시간을 입력하세요")
        }
        else {
          axios.post('http://3.139.244.188:3000/createTodo', {
            date: this.selectedString,
            title: this.title,
            time: this.isTimeline,
            startTime: this.startTime,
            endTime: this.endTime,
            userID: 1
          }).then((res) => {
            if (res.data != 'error') {
              console.log("테이블 생성");
            } else {
              console.log(res.data)
            }
          })

        }
        this.modalController.dismiss({
          'dismissed': true
        });
      }
      else {
        axios.post('http://3.139.244.188:3000/createTodo', {
          date: this.selectedString,
          title: this.title,
          time: this.isTimeline,
          startTime: this.startTime,
          endTime: this.endTime,
          userID: 1
        }).then((res) => {
          if (res.data != 'error') {
            console.log("테이블 생성");
          } else {
            console.log("에러 발생")
          }
        })
      }
      this.modalController.dismiss({
        'dismissed': true
      });
    }
  }
  timeActive() {
    if (this.isTimeline == 0) {
      this.isTimeline = 1;
    }
    else {
      this.startTime = null;
      this.endTime = null;
      this.isTimeline = 0;
    }
  }
}
