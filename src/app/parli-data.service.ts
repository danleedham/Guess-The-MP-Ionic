import { MemberImage } from './memberImage.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParliDataService {
  loadedData: any;
  constructor(public http: HttpClient) {}

  getCurrentParliamentID() {
    return this.http
      .get('https://api.parliament.uk/query/parliament_current.json')
      .pipe(
        map(responseData => {
          const currentParliamentId = [];
          for (const key in responseData) {
            if (key !== '') {
              currentParliamentId.push(responseData[key]);
            }
          }
          return currentParliamentId[1][0]['@id'];
        })
      );
  }

  getMembersCurrentParliament() {
    return this.http.get('https://api.parliament.uk/query/member_current').pipe(
      map(responseData => {
        const currentParliamentDetail = [];
        for (const key in responseData) {
          if (key !== '') {
            currentParliamentDetail.push(responseData[key]);
          }
        }
        return currentParliamentDetail[1];
      })
    );
  }

  getAllMembersImageData() {
    console.log('Fetching Data');
    return this.http
      .get('https://api.parliament.uk/query/person_photo_index.json')
      .pipe(
        map(responseData => {
          const imageData = [];
          for (const key in responseData) {
            if (key !== '') {
              imageData.push(responseData[key]);
            }
          }
          const imageDataVars = imageData[0].vars;
          const imageDataPeople = imageData[1].bindings;
          return imageDataPeople;
        })
      );
  }

  getMemberImageFromApiId(apiId: string, crop: string, quality: number) {
    // API Expects id*, extension*, crop, width, height, quality, download
    const extensionsAvailable = [
      'jpg',
      'png',
      'webp',
      'gif',
      'tif',
      'ico',
      'pdf'
    ];
    const cropsAvailable = ['MCU_3:2', 'MCU_3:4', 'CU_1:1', 'CU_5:2']; // From https://api.parliament.uk/photo/
    const id = apiId;
    let newImageUrl = '';
    if (cropsAvailable.includes(crop)) {
      newImageUrl =
        'https://api.parliament.uk/photo/' +
        id +
        '.jpeg?crop=' +
        crop +
        '&quality=' +
        quality;
    } else {
      newImageUrl = 'https://api.parliament.uk/photo/iXSJ5Acp.jpeg';
    }
    return newImageUrl;
    // https://api.parliament.uk/photo/iXSJ5Acp
  }

  getMemberImageMetadataFromAPIURL(apiURL) {
    // foo
  }

  getNewApiRandomMember(house: string) {
    if (house !== 'Lords' && house !== 'Commons') {
      house = 'Commons';
    }
    let membersCount = 650;
    if (house !== 'Commons') {
      membersCount = 700;
    }

    const rand = Math.floor(Math.random() * membersCount);
    return this.http
      .get(
        'https://cors-anywhere.herokuapp.com/https://members-api.parliament.uk/api/Members/Search?House=' +
          house +
          '&IsCurrentMember=true&skip=' +
          rand +
          '&take=1'
      )
      .pipe(
        map(responseData => {
          const randomMembers = [];
          for (const key in responseData) {
            if (key !== '') {
              randomMembers.push(responseData[key]);
            }
          }
          return randomMembers[0][0];
        })
      );
  }

  getNewApiMemberImage(id: number, crop?: string) {
    const cropsAvailable = ['ThreeTwo', 'FullSize', 'ThreeFour', 'OneOne'];
    if (cropsAvailable.includes(crop)) {
      return (
        'https://members-api.parliament.uk/api/Members/' +
        id +
        '/Portrait?cropType=' +
        crop
      );
    } else {
      return (
        'https://members-api.parliament.uk/api/Members/' +
        id +
        '/Portrait?cropType=FullSize'
      );
    }
  }
}
