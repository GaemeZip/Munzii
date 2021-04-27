import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.page.html',
  styleUrls: ['./todo-form.page.scss'],
})
export class TodoFormPage implements OnInit {
  selectedString: string = "";
  selected: Date;
  selectMonth: string;
  title: string;
  startTime: any;
  endTime: any;
  startTimeString: string;
  endTimeString: string;
  isTimeline: any;

  constructor(
    private router: Router,
    private navParams: NavParams, 
    public navCtrl: NavController,
    private modalController: ModalController,
    public datepipe: DatePipe
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
    console.log(typeof this.startTimeString, this.startTimeString)
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
            startTime: this.startTimeString,
            endTime: this.endTimeString,
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
          startTime: this.startTimeString,
          endTime: this.endTimeString,
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
  calculateStartTime() {
    console.log(this.startTime, typeof this.startTime)
    let temp = new Date(this.startTime);
    this.startTimeString = this.datepipe.transform(temp, 'HH:mm:ss');
    console.log(this.startTimeString, typeof this.startTimeString)
  }
  calculateEndTime() {

    let temp = new Date(this.endTime);
    this.endTimeString = this.datepipe.transform(temp, 'HH:mm:ss');
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
