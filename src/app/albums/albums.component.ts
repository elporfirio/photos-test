import {Component, OnInit} from '@angular/core';
import {PhotosService} from '../services/photos.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  public allAlbums;
  public recentAlbums;

  constructor(private _photosService: PhotosService) {
  }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this._photosService.getPhotos()
      .subscribe(result => {

        this.allAlbums = this.groupAlbums(result);
        console.log(this.allAlbums);
        // let albums = this.allAlbums;
        // debugger;
        this.recentAlbums = this.getRecentAlbums(3, this.allAlbums);
        console.log(this.recentAlbums);
      });
  }

  groupAlbums(albums) {
    return albums.reduce((groups, item) => {
      const val = item['albumId'];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    });
  }

  getRecentAlbums(quantity, albums) {
    const tmp = this.objectoToArray(albums);
    return tmp.slice(quantity * -1);
  }

  getLastPhotos(album, quantity){
    return album.slice(quantity * -1);
  }

  private objectoToArray(albums) {
    const array = [];
    for (let value in albums) {
      if (!isNaN(parseInt(value))) {
        array.push(albums[value]);
      }
    }
    return array;
  }
}
