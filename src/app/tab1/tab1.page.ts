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
    const house = 'both';
    this.getRandomMember(house);
  }

  getRandomMember(house: string) {
    this.parliDataService
      .getMembersCurrentParliament()
      .subscribe(currentParliamentMembers => {
        let hasMemberImage = 0;
        while (hasMemberImage < 1) {
          const rand = Math.floor(
            Math.random() * currentParliamentMembers.length
          );
          const id = currentParliamentMembers[rand]['@id'];
          if (currentParliamentMembers[rand]['memberHasMemberImage']) {
            console.log(currentParliamentMembers[rand]);
            const largeImageUrl = this.parliDataService.getMemberImageFromApiId(
              currentParliamentMembers[rand]['memberHasMemberImage']['@id'],
              'CU_5:2',
              80
            );
            this.randomMember = [
              {
                name: currentParliamentMembers[rand]['http://example.com/F31CBD81AD8343898B49DC65743F0BDF'],
                largeImageUrl
              }
            ];
            hasMemberImage = 1;
          }
        }
      });
  }
}
