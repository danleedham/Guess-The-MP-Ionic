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

  getMembersImageData() {
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

  getMemberImageFromAPIURL(apiURL: string, crop: string, quality: number) {
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
    const id = apiURL.replace('https://id.parliament.uk/', '');
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

  getMemberImageFromID(id: number) {
    return (
      'https://data.parliament.uk/membersdataplatform/services/images/memberphoto/' +
      id
    );
  }

  getMemberImageMetadataFromAPIURL(apiURL) {
    // foo
  }
}
