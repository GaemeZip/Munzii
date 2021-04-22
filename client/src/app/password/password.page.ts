import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  windowHeight: number = window.screen.height;

  
  constructor(private router:Router) { 
  }

  ngOnInit() {
  }

  prev(){
    this.router.navigate(['/settings']);
  }
  moveToPasswordInput(){
    this.router.navigate(['/password-input'])
  }

}
