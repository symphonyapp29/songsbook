import { Component, OnInit,Input } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { SongPagePage } from '../song-page/song-page.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  songBook: any;
  allSongs:any;
  items:any;
  searchInput:any;
  constructor(public modalCtrl: ModalController,
    private navParams: NavParams) 
    { 
      this.allSongs = [];
      this.searchInput = [];
    }

  ngOnInit() {
    this.songBook = this.navParams.get('songBook');
    if(this.songBook=="main_songs"){
      let data = JSON.parse(localStorage.getItem("mainSongBookSortedData"));
      this.items = data;
    }else{
      let data = JSON.parse(localStorage.getItem("childrenSongBookSortedData"));
      this.items = data; 
    }
  }

  ionViewWillEnter() {
    this.songBook = this.navParams.get('songBook');
    if(this.songBook=="main_songs"){
      // let data = JSON.parse(localStorage.getItem("mainSongBook"));
      let data = JSON.parse(localStorage.getItem("mainSongBookSortedData"));
      this.items = data;
      this.allSongs = data;
    }else{
      let data = JSON.parse(localStorage.getItem("childrenSongBookSortedData"));
      this.items = data; 
      this.allSongs = data;
    }
  }

  async modalDismiss() {
    // const result = [];
    await this.modalCtrl.dismiss();
  }

  selectedSong(song){
    const searchInput = song;
    this.modalCtrl.dismiss(searchInput);
  }

  getItems(ev) {
    let val = ev.target.value;
    this.items = this.allSongs;
    if (val && val.trim() != '') {
      if(parseInt(val)>0){
        
        this.items = this.items.filter((item) => {
          let song = ""+item.song_no;
          let data = (song.toLowerCase().indexOf(val.toLowerCase()) > -1);
          return data;
        });
      }else{
        this.items = this.items.filter((item) => {
          return (item.song_title_english.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }else{
      return this.items = this.allSongs;
    }
  }

}
