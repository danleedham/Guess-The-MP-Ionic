import { ParliDataService } from './../parli-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  members = [];
  fullSizeImageUrl: string;
  isFetching: boolean;
  constructor(public parliDataService: ParliDataService) {}

  ionViewWillEnter() {
    this.getRandomMember('Lords');
  }

  getRandomMember(house: string) {
    this.parliDataService.getNewApiRandomMember(house).subscribe(data => {
      this.members = [data.value];
      console.log(this.members);
    });
  }
}
