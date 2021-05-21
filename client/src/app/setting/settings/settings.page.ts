import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  windowHeight: number = window.screen.height;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  prev(){
    location.href="/home";
  }
}
