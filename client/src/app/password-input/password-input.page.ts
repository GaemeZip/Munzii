import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.page.html',
  styleUrls: ['./password-input.page.scss'],
})
export class PasswordInputPage implements OnInit {
  windowHeight: number = window.screen.height;

  constructor() { }

  ngOnInit() {
  }

}
