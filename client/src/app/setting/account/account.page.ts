import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {
  windowHeight: number = window.screen.height;
  username;
  constructor(private router:Router) { 
  }

  ngOnInit() {
   this.username = localStorage.username;
   
  }

  prev(){
    this.router.navigate(['/settings']);
  }

  logout(){
    localStorage.clear();
    //this.router.navigate(['/phaser']);
    location.href = ('/phaser');
  }
}
