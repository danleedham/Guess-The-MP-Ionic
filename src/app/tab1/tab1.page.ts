import { ParliDataService } from './../parli-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loadedData: any;
  randomMember: {};
  isFetching: boolean;
  constructor(public parliDataService: ParliDataService) {}

  ionViewWillEnter() {
    this.isFetching = true;
    this.parliDataService.getMembersImageData().subscribe(data => {
      this.loadedData = data;
      this.isFetching = false;
      this.getRandomMember();
    });
  }

  getRandomMember() {
    const rand = Math.floor(Math.random() * this.loadedData.length);
    const id = this.loadedData[rand].mnisId.value;
    console.log(this.loadedData[rand]);
    const imageURL = this.parliDataService.getMemberImageFromID(id);
    const largeImage = this.parliDataService.getMemberImageFromAPIURL(
      this.loadedData[rand].image.value,
      'CU_5:2',
      80
    );
    this.randomMember = [
      { name: this.loadedData[rand].displayAs.value, imageURL, largeImage }
    ];
  }
}
