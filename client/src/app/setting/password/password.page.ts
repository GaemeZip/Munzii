import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

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
    axios.get('http://localhost:3000/readPassword', {
      params: {
        userID: 1
      }
    })
      .then(res => {
        if (res.data != 'error') {
          if(res.data[0].optional_password!=null){
            this.isOn=true;
            this.isOff=false;
          console.log(res.data[0].optional_password);

          }else{
            this.isOn = false;
            this.isOff = true;
          }
        } else {
          console.log("에러 발생")
        }
      })
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
    }
    
  }
  toggleOffPassword(){
    if(this.isOff == false){
      this.isOn=false;
      this.isOff=true;
    }
    axios.post('http://localhost:3000/updatePassword', {
      password: null,
      userID: 1
    }).then((res) => {
      if (res.data != 'error') {
        console.log("비번 null");
      } else {
        console.log("에러 발생")
      }
    })
  }

}
