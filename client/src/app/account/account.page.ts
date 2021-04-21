import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  windowHeight: number = window.screen.height;

  constructor(private router:Router) { 
  }

  ngOnInit() {
  }

  prev(){
    this.router.navigate(['/settings']);
  }
}
