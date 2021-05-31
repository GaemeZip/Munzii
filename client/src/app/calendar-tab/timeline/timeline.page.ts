import { Component, OnInit } from '@angular/core';
import { CalendarTabPage} from '../calendar-tab.page';
import { ModalController } from '@ionic/angular';
import { TodoFormPage } from '../todo-form/todo-form.page';
import { TodoEditFormPage } from '../todo-edit-form/todo-edit-form.page';
import axios from 'axios';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  windowHeight: number = window.screen.height-150;
  selected: Date;
  selectMonth: string;
  date: string;
  initialToday: string;
  finalToday: string;
  progress: number;
  locationTime: any;

  duration: number;

  monthNames: any;
  timeList: number [] = [];
  timelineList: any[] = [];
  height: number[] =[];
  spaceHeight: number[] = [];

  constructor(
    private CalendarTabPage: CalendarTabPage,
    public modalController: ModalController,
    
  ) {
    this.monthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
   }

  ngOnInit() {
    let temp = location.href.split("?");
    temp = temp[1].split("=");
    this.date = temp[1];
    this.selected = new Date(this.date);
    this.selectMonth = this.monthNames[this.selected.getMonth()]
    console.log(this.selected)

    this.initialToday = "00:00:00";
    this.finalToday = "23:59:00";
    this.timeList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    this.duration= 7;
    this.getTimeLineList();
  }

  getTimeLineList() {
    console.log(this.date)
    this.timelineList = new Array;
    axios.get('http://localhost:3000/todo',{
      params:{
        date: this.date,
        userID: localStorage.userID
      }
    })
    .then(res => {
      let doneCnt = 0;
      for(var i = 0; i < res.data.length; i++) {
        if(res.data[i].time == 1) {
          this.timelineList.push(res.data[i]);
        }
        if(i == res.data.length - 1) {

        }
        if(res.data[i].is_done == 1) {
          doneCnt ++;
        }
      }
      if(doneCnt == res.data.length) {
        this.progress = 100;
      }
        this.sortTimeline();    
        this.getHeight();
    })
  }
  sortTimeline() {
    this.timelineList.sort((a: any, b: any): number => {
      return ( Number(a.start_time.substr(0,2)) * 60 + Number(a.start_time.substr(3,2)) ) - ( Number(b.start_time.substr(0,2)) * 60 + Number(b.start_time.substr(3,2)) );
    });
    console.log(this.timelineList)
  }
  getHeight() {
    if(this.timelineList.length !== 0) {
      this.spaceHeight = new Array;
      console.log(this.timelineList.length)
      for(var i = 0; i < this.timelineList.length; i ++) {
        if(i == 0){
          this.spaceHeight.push(this.calculateSpaceHeight(this.timelineList[i].start_time, this.initialToday));
          this.height.push(this.calculateHeight(this.timelineList[i].start_time, this.timelineList[i].end_time));
        }
        else {
          this.spaceHeight.push(this.calculateSpaceHeight(this.timelineList[i].start_time, this.timelineList[i-1].end_time));
          this.height.push(this.calculateHeight(this.timelineList[i].start_time, this.timelineList[i].end_time));
        }
      }
      this.spaceHeight.push(this.calculateSpaceHeight(this.finalToday, this.timelineList[this.timelineList.length-1].end_time));

      console.log(this.spaceHeight, this.height)
      this.locationTime = (1439-this.spaceHeight[this.spaceHeight.length-1]);
    }
  }
  calculateSpaceHeight(startTime, previousEndTime) {
    let previous = Number(previousEndTime.substr(0,2)) * 60 + Number(previousEndTime.substr(3,2));
    let start = Number(startTime.substr(0,2)) * 60 + Number(startTime.substr(3,2));
    return (start - previous);
  }
  calculateHeight(startTime, endTime) {
    // console.log(startTime, endTime)
    let start = Number(startTime.substr(0,2)) * 60 + Number(startTime.substr(3,2));
    let end = Number(endTime.substr(0,2)) * 60 + Number(endTime.substr(3,2));
    return (end - start);
  }

  async createTodo() {
    console.log("모달 눌림")
    const modal = await this.modalController.create({
      component: TodoFormPage,
      animated: true,
      componentProps: { 
        time: 1,
        selected: this.selected,
        selectMonth: this.selectMonth,
      },
      cssClass: 'modal-custom'
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        location.href="/calendar-tab/timeline?date=" + this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();
      }
    });
    return await modal.present();
  }
  async editTodo(todo) {
    let index = this.timelineList.indexOf(todo);
    let id = this.timelineList[index].id;
    console.log(index);
    const modal = await this.modalController.create({
      component: TodoEditFormPage,
      animated: true,
      componentProps: { 
        id: id,
        selected: this.selected,
        selectMonth: this.selectMonth,
        todoTitle: this.timelineList[index].title,
        todoIsTimeline: this.timelineList[index].time,
        todoIsDone: this.timelineList[index].is_done,
        todoStartTime: this.timelineList[index].start_time,
        todoEndTime: this.timelineList[index].end_time,
      },
      cssClass: 'modal-custom'
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        location.href="/calendar-tab/timeline?date=" + this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();
      }
    });
    return await modal.present();
  }
  deleteTodo(todo) {
    let index = this.timelineList.indexOf(todo);
    let id = this.timelineList[index].id;
    axios.delete('http://localhost:3000/todo', {
      params:{
        id: id,
        userID: localStorage.userID 
      }
    }).then((res) => {
      if (res.data != 'error') {
        console.log("테이블 삭제");
        this.ngOnInit();
      } else {
        console.log("에러 발생")
      }
    location.href="/calendar-tab/timeline?date=" + this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();
    })
  }
  calculateDone(todo) {
    if (todo.is_done == 0) {
      todo.is_done = 1;
    }
    else {
      todo.is_done = 0;
    }
    var tempProgress = 0;
    for (var i=0; i < this.timelineList.length; i ++) {
      tempProgress += this.timelineList[i].is_done;
    }
    this.progress = tempProgress / this.timelineList.length * 100;
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
        console.log("테이블 업데이트");
      } else {
        console.log("에러 발생")
      }
    })
  }
}
