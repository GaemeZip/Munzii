import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {

  constructor(private router: Router) { }
  username: string;
  password: string;

  join() {
    console.log(this.username);
    axios.post('http://localhost:3000/join', {
      username: this.username,
      password: this.password
    })
      .then((res) => {
        console.log(res.data);
        if (res.data == "회원가입 성공") {
          alert("회원가입 성공");
          this.router.navigate(['/login']);
        }
        console.log(res);
      })
  }

  ngOnInit() {

  }

}
