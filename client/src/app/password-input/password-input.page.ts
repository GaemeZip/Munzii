import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.page.html',
  styleUrls: ['./password-input.page.scss'],
})
export class PasswordInputPage implements OnInit {
  windowHeight: number = window.screen.height;

  
  constructor(private router:Router) { 
  }

  ngOnInit() {
  }

  prev(){
    this.router.navigate(['/password']);
  }
}
