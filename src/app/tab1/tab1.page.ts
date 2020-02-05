import { ParliDataService } from './../parli-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  randomMember = [];
  randomMember2 = [];
  randomMember3 = [];
  randomMember4 = [];
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
  }

  getRandomMembers(house: string) {
    // this.isFetching = true;
    this.parliDataService.getMembersCurrentParliament(house).subscribe(data => {
      const allMembers = data[1];
      const chosenMember = data[1][Math.floor(Math.random() * data[1].length)];
    });

    this.parliDataService.getNewApiRandomMembers(house, 4).subscribe(data => {
      this.randomMember = [data[0].value];
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
