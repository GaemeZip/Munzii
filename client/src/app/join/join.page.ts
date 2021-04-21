import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {

  constructor(private router: Router) { }
  username: string;
  password: string;

  join(){
    console.log(this.username)
  }

  ngOnInit() {

  }

}
