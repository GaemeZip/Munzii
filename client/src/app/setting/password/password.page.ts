import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  windowHeight: number = window.screen.height;
  isOn = false;
  isOff = true;
  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  prev() {
    this.router.navigate(['/settings']);
  }

  moveToPasswordInput() {
    this.router.navigate(['/password-input']);
  }

  toggleOnPassword() {
    if(this.isOn == false){
      this.isOn=true;
      this.isOff=false;

      this.router.navigate(['/password-input']);

      //TODO:: 암호 입력 받고 한 번 더 입력 받아서 같은지 비교하고 같으면 암호 저장

      
    }

  }
  toggleOffPassword(){
    if(this.isOff == false){
      this.isOn=false;
      this.isOff=true;
    }
  }
}
