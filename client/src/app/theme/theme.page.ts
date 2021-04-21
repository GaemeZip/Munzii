import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit {
  windowHeight: number = window.screen.height;
  constructor() { }

  ngOnInit() {
  }

}
