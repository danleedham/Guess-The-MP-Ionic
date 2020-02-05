import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  inputHouse = 'Commons';
  useHdImages = true;
  constructor() {}

  ionViewWillEnter() {
    this.loadSavedSettings();
  }

  onHouseChange(event) {
    localStorage.setItem('guess-mp-house', event.detail.value);
  }

  onHdImageChange(event) {
    localStorage.setItem('guess-mp-images', event.detail.checked);
  }

  loadSavedSettings() {
    if (localStorage.getItem('guess-mp-house') !== null) {
      this.inputHouse = localStorage.getItem('guess-mp-house');
    }
    if (localStorage.getItem('guess-mp-images') !== null) {
      const set = localStorage.getItem('guess-mp-images');
      if (set === 'true') {
        this.useHdImages = true;
      } else {
        this.useHdImages = false;
      }
    }
  }
}
