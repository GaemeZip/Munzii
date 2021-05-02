import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() { }
  ngOnInit() {
    const change = document.querySelector('body');

    if (localStorage.themeId == null) { // default
      console.log("없음!")
      localStorage.f_family = 'NexonGothic';
      localStorage.themeId = 1;
      localStorage.t_primary = '#FFF3A9';
      localStorage.t_check = '#97C1E87E';
      localStorage.t_complete = '#FDE2E2';
      localStorage.t_button ='#F9D667';
      localStorage.t_darkYellow = '#FDE2E2';
      localStorage.t_background = '#FCECB6';

      // change.style.setProperty('--ion-font-family', 'NexonGothic');

      // change.style.setProperty('--ion-color-primary', '#FFF3A9');
      // change.style.setProperty('--ion-color-check', '#97C1E87E');
      // change.style.setProperty('--ion-color-complete', '#FDE2E2');
      // change.style.setProperty('--ion-color-button', '#F9D667');
      // change.style.setProperty('--ion-color-dark-yellow', '#FDE2E2');
      // change.style.setProperty('--ion-theme-background', '#FCECB6');
    }

    change.style.setProperty('--ion-font-family', localStorage.f_family);

    change.style.setProperty('--ion-color-primary', localStorage.t_primary);
    change.style.setProperty('--ion-color-check', localStorage.t_check);
    change.style.setProperty('--ion-color-complete', localStorage.t_complete);
    change.style.setProperty('--ion-color-button', localStorage.t_button);
    change.style.setProperty('--ion-color-dark-yellow', localStorage.t_darkYellow);
    change.style.setProperty('--ion-theme-background', localStorage.t_background);
  }
}
