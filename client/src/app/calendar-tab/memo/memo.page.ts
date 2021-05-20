import { Component, OnInit } from '@angular/core';
import { CalendarTabPage} from '../calendar-tab.page';
import axios from 'axios';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage implements OnInit {

  selected: Date;
  selectMonth: string;
  monthNames: any;

  selectedDate = '2021-04-22';
  input = null;
  tempInput = null;
  date: any;
  constructor(
    private CalendarTabPage: CalendarTabPage) { 
      this.monthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    }
  ngOnInit() {
    let temp = location.href.split("?");
    temp = temp[1].split("=");
    this.date = temp[1];
    this.selected = new Date(this.date);
    this.selectMonth = this.monthNames[this.selected.getMonth()]
    this.readMemo();

  }

  readMemo() {
    axios.get('http://3.139.244.188:3000/readMemo', {
      params: {
        date: this.date,
        userID: localStorage.userID
      }
    })
      .then(res => {
        if (res.data != 'error') {
          if (res.data[0]) {
            this.input = res.data[0].content;
            this.tempInput = res.data[0].content;
            console.log("메모 읽어오기");
          } else {
            console.log('읽어올 데이터가 없습니다.');
          }
        } else {
          console.log("에러 발생")
        }
      })
  }

  createMemo() {
    axios.post('http://3.139.244.188:3000/createMemo', {
      date: this.date,
      content: this.input,
      userID: localStorage.userID
    }).then((res) => {
      if (res.data != 'error') {
        this.tempInput = this.input;
        console.log("메모 생성");
      } else {
        console.log("에러 발생")
      }
    })
  }

  updateMemo() {
    axios.post('http://3.139.244.188:3000/updateMemo', {
      date: this.date,
      content: this.input,
      userID: localStorage.userID
    }).then((res) => {
      if (res.data != 'error') {
        this.tempInput = this.input;
        console.log("메모 업데이트");
      } else {
        console.log("에러 발생")
      }
    })
  }

  deleteMemo() {
    axios.post('http://3.139.244.188:3000/deleteMemo', {
      date: this.date,
      userID: localStorage.userID
    }).then((res) => {
      if (res.data != 'error') {
        console.log("메모 삭제");
        this.input = null;
        this.tempInput = null;
      } else {
        console.log("에러 발생")
      }
    })
  }

  inputMemo() {
    if (this.tempInput == null) {
      this.createMemo();
    } else {
      this.updateMemo();
    }
  }
}
