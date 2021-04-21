import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-day',
  templateUrl: './start-day.page.html',
  styleUrls: ['./start-day.page.scss'],
})
export class StartDayPage implements OnInit {
  windowHeight: number = window.screen.height;
  constructor() { }

  ngOnInit() {
  }

}
