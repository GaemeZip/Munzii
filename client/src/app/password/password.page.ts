import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  windowHeight: number = window.screen.height;

  constructor() { }

  ngOnInit() {
  }

}
