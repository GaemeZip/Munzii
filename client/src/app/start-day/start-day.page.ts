import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-day',
  templateUrl: './start-day.page.html',
  styleUrls: ['./start-day.page.scss'],
})
export class StartDayPage implements OnInit {
  windowHeight: number = window.screen.height;
  
  constructor(private router:Router) { 
  }

  ngOnInit() {
  }

  prev(){
    this.router.navigate(['/settings']);
  }
}
