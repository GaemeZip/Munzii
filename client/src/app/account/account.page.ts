import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  windowHeight: number = window.screen.height;

  constructor() { }

  ngOnInit() {
  }

}
