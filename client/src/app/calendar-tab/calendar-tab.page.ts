import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-tab',
  templateUrl: './calendar-tab.page.html',
  styleUrls: ['./calendar-tab.page.scss'],
})
export class CalendarTabPage implements OnInit {
  currentTab: string;

  constructor(
    private router: Router) { }

  ngOnInit() {
    this.currentTab = 'todo';
  }
  clickPrevTab() {
    if(this.currentTab == 'timeline') {
      this.currentTab = 'todo';
      this.router.navigateByUrl('/calendar-tab/todo')
    }
    else if(this.currentTab == 'memo') {
      this.currentTab = 'timeline';
      this.router.navigateByUrl('/calendar-tab/timeline')
    }
  }
  clickNextTab() {
    if(this.currentTab == 'timeline') {
      this.currentTab = 'memo';
      this.router.navigateByUrl('/calendar-tab/memo')
    }
    else if(this.currentTab == 'todo') {
      this.currentTab = 'timeline';
      this.router.navigateByUrl('/calendar-tab/timeline')
    }

  }

}
