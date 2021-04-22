import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit {
  windowHeight: number = window.screen.height;
  constructor(private router: Router) { }

  prev(){
    this.router.navigate(['/settings']);
  }
  ngOnInit() {
  }

}
