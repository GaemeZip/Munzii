import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage implements OnInit {
  windowHeight: number = window.screen.height;
  memo;
  constructor() { }

  ngOnInit() {
    axios.get('http://localhost:3000/readMemo', {
      params: {
        date: '2021-04-17',
        userID: 1
      }
    })
      .then(res => {
        console.log(res.data);
      })
  }

 
  createMemo() {
    axios.post('http://localhost:3000/createMemo', {
      date: '2021-04-22',
      content: '새로운 메모가 생성 되었습니다.',
      userID: 1
    }).then((res) => {
      if (res.data != 'error') {
        console.log("메모 생성");
      } else {
        console.log("에러 발생")
      }
    })
  }

  updateMemo() {
    axios.post('http://localhost:3000/updateMemo', {
      id: 7,
      content: '메모를 수정하였습니다 ~!',
      userID: 1
    }).then((res) => {
      if (res.data != 'error') {
        console.log("메모 업데이트");
      } else {
        console.log("에러 발생")
      }
    })
  }

  deleteMemo() {
    axios.post('http://localhost:3000/deleteMemo', {
      id: 6,
      userID: 1
    }).then((res) => {
      if (res.data != 'error') {
        console.log("메모삭제");
      } else {
        console.log("에러 발생")
      }
    })
  }
}
