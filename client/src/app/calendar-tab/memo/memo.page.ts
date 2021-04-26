import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage implements OnInit {
  selectedDate = '2021-04-22';
  input = null;
  tempInput = null;
  constructor() { }

  ngOnInit() {
    this.readMemo();

  }

  readMemo() {
    axios.get('http://3.139.244.188:3000/readMemo', {
      params: {
        date: this.selectedDate,
        userID: 1
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
      date: this.selectedDate,
      content: this.input,
      userID: 1
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
      date: this.selectedDate,
      content: this.input,
      userID: 1
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
      date: this.selectedDate,
      userID: 1
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
