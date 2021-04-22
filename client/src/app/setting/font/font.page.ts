import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-font',
  templateUrl: './font.page.html',
  styleUrls: ['./font.page.scss'],
})
export class FontPage implements OnInit {
  windowHeight: number = window.screen.height;
  
  constructor(private router:Router) { 
  }

  ngOnInit() {
  }

  prev(){
    this.router.navigate(['/settings']);
  }

}
