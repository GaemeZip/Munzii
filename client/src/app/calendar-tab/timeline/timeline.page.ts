import { Component, OnInit } from '@angular/core';
import { CalendarTabPage} from '../calendar-tab.page';
import { ModalController } from '@ionic/angular';
import { TodoFormPage } from '../todo-form/todo-form.page';
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

  duration: number;

  timeList: number [] = [];
  timelineList: any[] = [];

  constructor(
    private CalendarTabPage: CalendarTabPage,
    public modalController: ModalController,
  ) {
    this.selected = this.CalendarTabPage.selected;
    this.selectMonth = this.CalendarTabPage.selectMonth;
   }

  ngOnInit() {
    this.timeList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    this.duration= 7;
    // this.date = this.selected.getFullYear() + "-" + this.selectMonth + "-" + this.selected.getDate();
    this.date = '2021-04-17';
    console.log(this.selected)
    this.getTimeLineList();
    console.log(this.timelineList)
  }

  getTimeLineList() {
    this.timelineList = new Array;
    axios.get('http://3.139.244.188:3000/readTodo',{
      params:{
        date: this.date,
	      userID: 1
      }
    })
    .then(res => {
      for(var i = 0; i < res.data.length; i++) {
        if(res.data[i].time == 1) {
          this.timelineList.push(res.data[i]);
        }
      }
    })
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
}
