import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import axios from 'axios';
import { start } from 'node:repl';
import { time } from 'node:console';

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
  isTime: any;
  tempStartTime: any;
  tempEndTime: any;

  constructor(
    private router: Router,
    private navParams: NavParams, 
    public navCtrl: NavController,
    private modalController: ModalController,
    public datePipe: DatePipe
  ) { 
    this.isTime = navParams.get('time');
    this.selected = navParams.get('selected');
    this.selectMonth = navParams.get('selectMonth');
  }

  ngOnInit() {
    this.isTimeline = this.isTime;
    console.log(this.isTime, this.isTimeline)
    this.title = null;
    this.startTime=null;
    this.endTime=null;
    this.selectedString = this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();
    console.log(this.selectedString)
  }
  refresh() {
    this.modalController.dismiss({
      'dismissed': true
    });

  }

  createTodo() {
    // console.log(typeof this.startTimeString, this.startTimeString)
    // this.selectedString='2021-04-17';
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
        else if(new Date(this.startTime).getHours() > new Date(this.endTime).getHours()) {
          alert("시작 시간은 종료 시간 이전이어야 합니다");
        }
        else if (new Date(this.startTime).getHours() == new Date(this.endTime).getHours()) {
          if(new Date(this.startTime).getMinutes() > new Date(this.endTime).getMinutes()) {
            alert("시작 시간은 종료 시간 이전이어야 합니다");
          }
          else {
            axios.get('http://localhost:3000/todo',{
            params:{
              date: this.selectedString,
              userID: localStorage.userID
            }
          })
          .then(res => {
            console.log(res.data.length)
            let end = Number(this.endTimeString.substr(0,2))*60 + Number(this.endTimeString.substr(3,2));
            let start = Number(this.startTimeString.substr(0,2))*60 + Number(this.startTimeString.substr(3,2));
            for(var i=0; i<res.data.length; i++) {
              console.log("aaaa")
              if(res.data[i].time == 1) {
                console.log("bbbb")
                let todoEnd = Number(res.data[i].end_time.substr(0,2))*60 + Number(res.data[i].end_time.substr(3,2));
                let todoStart = Number(res.data[i].start_time.substr(0,2))*60 + Number(res.data[i].start_time.substr(3,2));
                if(end <= todoEnd && end > todoStart) {
                  alert("이미 일정이 있는 시간대입니다");
                  break;
                }
                else if(start < todoEnd && start >= todoStart) {
                  alert("이미 일정이 있는 시간대입니다");
                  break;
                }
                else if(start <= todoStart && end >= todoEnd) {
                  alert("이미 일정이 있는 시간대입니다");
                  break;
                }
                else {
                  axios.post('http://localhost:3000/todo', {
                    date: this.selectedString,
                    title: this.title,
                    time: this.isTimeline,
                    startTime: this.startTimeString,
                    endTime: this.endTimeString,
                    userID: localStorage.userID
                  }).then((res) => {
                    console.log(444444444)
                    if (res.data != 'error') {
                      console.log("테이블 생성");
                    } else {
                      console.log(res.data)
                    }
                  })
                // location.href="/calendar-tab/todo?date=" + this.selectedString;
                this.modalController.dismiss({
                  'dismissed': true
                });
                break;
                }
              }
                else {
                if(i == res.data.length-1){
                  axios.post('http://localhost:3000/todo', {
                    date: this.selectedString,
                    title: this.title,
                    time: this.isTimeline,
                    startTime: this.startTimeString,
                    endTime: this.endTimeString,
                    userID: localStorage.userID
                  }).then((res) => {
                    console.log(1111111111)
                    if (res.data != 'error') {
                      console.log("테이블 생성");
                    } else {
                      console.log(res.data)
                    }
                  })
                // location.href="/calendar-tab/todo?date=" + this.selectedString;
                this.modalController.dismiss({
                  'dismissed': true
                });
                  break;
                }
                continue;
                }
  
            }
            if(res.data.length == 0) {
              axios.post('http://localhost:3000/todo', {
                date: this.selectedString,
                title: this.title,
                time: this.isTimeline,
                startTime: this.startTimeString,
                endTime: this.endTimeString,
                userID: localStorage.userID
              }).then((res) => {
                console.log(22222222)
                if (res.data != 'error') {
                  console.log("테이블 생성");
                } else {
                  console.log(res.data)
                }
              })
            // location.href="/calendar-tab/todo?date=" + this.selectedString;
            this.modalController.dismiss({
              'dismissed': true
            });
            }
  
  
          })
  
          }
        }
        else {
          console.log("왜 안대지")
          axios.get('http://localhost:3000/todo',{
          params:{
            date: this.selectedString,
            userID: localStorage.userID
          }
        })
        .then(res => {
          console.log(res.data.length)
          let end = Number(this.endTimeString.substr(0,2))*60 + Number(this.endTimeString.substr(3,2));
          let start = Number(this.startTimeString.substr(0,2))*60 + Number(this.startTimeString.substr(3,2));
          for(var i=0; i<res.data.length; i++) {
            console.log("dadada")
            if(res.data[i].time == 1) {
              let todoEnd = Number(res.data[i].end_time.substr(0,2))*60 + Number(res.data[i].end_time.substr(3,2));
              let todoStart = Number(res.data[i].start_time.substr(0,2))*60 + Number(res.data[i].start_time.substr(3,2));
              if(end <= todoEnd && end > todoStart) {
                alert("이미 일정이 있는 시간대입니다");
                break;
              }
              else if(start < todoEnd && start >= todoStart) {
                alert("이미 일정이 있는 시간대입니다");
                break;
              }
              else if(start <= todoStart && end >= todoEnd) {
                alert("이미 일정이 있는 시간대입니다");
                break;
              }
              else {
                axios.post('http://localhost:3000/todo', {
                  date: this.selectedString,
                  title: this.title,
                  time: this.isTimeline,
                  startTime: this.startTimeString,
                  endTime: this.endTimeString,
                  userID: localStorage.userID
                }).then((res) => {
                  console.log(444444444)
                  if (res.data != 'error') {
                    console.log("테이블 생성");
                  } else {
                    console.log(res.data)
                  }
                })
              // location.href="/calendar-tab/todo?date=" + this.selectedString;
              this.modalController.dismiss({
                'dismissed': true
              });
              break;
              }
            }
              else {
              //   axios.post('http://3.139.244.188:3000/createTodo', {
              //     date: this.selectedString,
              //     title: this.title,
              //     time: this.isTimeline,
              //     startTime: this.startTimeString,
              //     endTime: this.endTimeString,
              //     userID: localStorage.userID
              //   }).then((res) => {
              //     console.log(1111111111)
              //     if (res.data != 'error') {
              //       console.log("테이블 생성");
              //     } else {
              //       console.log(res.data)
              //     }
              //   })
              // // location.href="/calendar-tab/todo?date=" + this.selectedString;
              // this.modalController.dismiss({
              //   'dismissed': true
              // });
              //   break;
              continue;
              }

          }
          if(res.data.length == 0) {
            axios.post('http://localhost:3000/todo', {
              date: this.selectedString,
              title: this.title,
              time: this.isTimeline,
              startTime: this.startTimeString,
              endTime: this.endTimeString,
              userID: localStorage.userID
            }).then((res) => {
              console.log(22222222)
              if (res.data != 'error') {
                console.log("테이블 생성");
              } else {
                console.log(res.data)
              }
            })
          // location.href="/calendar-tab/todo?date=" + this.selectedString;
          this.modalController.dismiss({
            'dismissed': true
          });
          }


        })

        }
      }
      else {
        console.log(this.selectedString, this.title, this.isTimeline, this.startTimeString, this.endTimeString)
        axios.post('http://localhost:3000/todo', {
          date: this.selectedString,
          title: this.title,
          time: this.isTimeline,
          startTime: this.startTimeString,
          endTime: this.endTimeString,
          userID: localStorage.userID
        }).then((res) => {
          console.log(33333333333)
          if (res.data != 'error') {
            console.log("테이블 생성");
          } else {
            console.log(res.data)
          }
        })

        // location.href="/calendar-tab/todo?date=" + this.selectedString;
        this.modalController.dismiss({
          'dismissed': true
        });
      }
    }
  }
  calculateStartTime() {
    let temp = new Date(this.startTime);
    this.startTimeString = this.datePipe.transform(temp, 'HH:mm:ss');
  }
  calculateEndTime() {
    let temp = new Date(this.endTime);
    this.endTimeString = this.datePipe.transform(temp, 'HH:mm:ss');
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
