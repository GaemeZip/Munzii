import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-font',
  templateUrl: './font.page.html',
  styleUrls: ['./font.page.scss'],
})
export class FontPage implements OnInit {
  windowHeight: number = window.screen.height;
  constructor() { }

  ngOnInit() {
  }

}
