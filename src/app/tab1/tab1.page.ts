import { ParliDataService } from './../parli-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  randomMember = [];
  answers = [];
  parties = [];
  cropType = 'OneOne';
  isFetching: boolean;
  house = 'Commons';
  useHdImages = true;

  constructor(public parliDataService: ParliDataService) {}

  ionViewWillEnter() {
    this.loadSavedSettings();
    this.getRandomMembers(this.house);
    this.parliDataService.getNewApiAllParties(this.house).subscribe(data=>{
      this.parties = this.shuffle(data);
      console.log(this.parties);
    });
  }

  getRandomMembers(house: string) {
    this.isFetching = true;
    this.parliDataService.getNewApiRandomMembers(house, 4).subscribe(data => {
      this.randomMember = [data[0].value];
      // console.log(this.randomMember);
      this.isFetching = false;
      // Shuffle answers
      this.answers = this.shuffle(data);
    });
  }

  updateMemberImageUrl($event) {
    // Listen for the member having no image.
    console.log($event);
    if ($event.type === 'error') {
      this.getRandomMembers(this.house);
    }
  }

  loadSavedSettings() {
    if (localStorage.getItem('guess-mp-house') !== null) {
      this.house = localStorage.getItem('guess-mp-house');
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

  onClickCheckName(e) {}

  onClickCheckConstituency(e) {}

  onClickCheckParty(e) {}

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
