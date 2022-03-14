import { Component, OnInit,ViewChild,ViewChildren,QueryList,ElementRef } from '@angular/core';
import { ActivatedRoute, convertToParamMap,Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-song-page',
  templateUrl: './song-page.page.html',
  styleUrls: ['./song-page.page.scss'],
})

export class SongPagePage implements OnInit {
  
  song:any;
  songBook:any;
  allSongs:any;
  fontSize =16;
  isFav:boolean;
  lineHeight = 30;
  bookType:any;
  favourite_main_songs:any;
  favourite_child_songs:any;
  slideSongs:any;
  constructor(private route: ActivatedRoute,
    private router:Router,
    private httpService:HttpServiceService
   
    ) { 
      this.songBook = "Main Book";
      this.favourite_main_songs = [];
      this.favourite_child_songs = [];
      this.allSongs =[];
      this.slideSongs =[];
      
      localStorage.setItem('pageName','SongPagePage');
      this.bookType = 1;
      this.fontSize = 16;
      this.lineHeight = 30;
      
    }

    

  ngOnInit() {
    let self = this;
    self.route.queryParams.subscribe(params => {
      if (params && params.song) {
        self.songBook = params.songBook;
        self.bookType = params.bookType;
        self.song = JSON.parse(params.song);
        self.isFav = params.isFav;
        self.allSongs =[];
        if(self.bookType==1){
          self.allSongs = JSON.parse(localStorage.getItem("mainSongBookOrginalData"));
          self.favourite_main_songs = JSON.parse(localStorage.getItem("favourite_main"));
          this.checkFavourite(self.song);
        }else{
          self.allSongs = JSON.parse(localStorage.getItem("childrenSongBookOrginalData"));
          self.favourite_child_songs = JSON.parse(localStorage.getItem("favourite_children"));
          this.checkFavourite(self.song);
        }
        
      }
    });
  }

  ionViewWillEnter()
  {
    let self = this;
    self.route.queryParams.subscribe(params => {
      if (params && params.song) {
        self.songBook = params.songBook;
        self.bookType = params.bookType;
        self.song = JSON.parse(params.song);
        self.isFav = params.isFav;
        this.checkFavourite(self.song);
        self.allSongs =[];
        if(self.bookType==1){
          self.allSongs = JSON.parse(localStorage.getItem("mainSongBookOrginalData"));
          self.favourite_main_songs = JSON.parse(localStorage.getItem("favourite_main"));
        }else{
          self.allSongs = JSON.parse(localStorage.getItem("childrenSongBookOrginalData"));
          self.favourite_child_songs = JSON.parse(localStorage.getItem("favourite_children"));
        }
        
      }
    });
  }

  previousSong(song){
    let self = this;
    let index = song.song_no-2;
    if(index>=0){
      self.song = self.allSongs[index];
      this.checkFavourite(self.song);
    }
  }
  
  checkFavourite(song) {
    
    let self = this;
    if(self.bookType==1){
      var favIndex = self.favourite_main_songs.indexOf(song.song_no);
      
    }else{
      var favIndex = self.favourite_child_songs.indexOf(song.song_no);
    }
    
    self.isFav = true;
    if(favIndex == -1){
      self.isFav = false;
    }

  }

  nextSong(song){
    let self = this;
    let index = song.song_no;
    if(index<=self.allSongs.length-1){
      self.song = self.allSongs[index];
      this.checkFavourite(self.song);
    }
  }

  onSwipeLeft($event) {
   
    let self = this;
    self.checkFavourite(self.song);
    let index = self.song.song_no-2;
    if(index>=0){
      self.song = self.allSongs[index];
    }
  }

  onSwipeRight($event) {
    
    let self = this;
    self.checkFavourite(self.song);
    let index = self.song.song_no;
    if(index<=self.allSongs.length-1){
      self.song = self.allSongs[index];
    }
  }

  increaseFontSize() {
    this.fontSize = this.fontSize+1;
    this.lineHeight = this.lineHeight+2;
  }

  decreaseFontSize() {
    if(this.fontSize >16){
      this.fontSize = this.fontSize-1;
      this.lineHeight = this.lineHeight-2;
    }
    
  }

  setFavourite(song){
    
    if(this.bookType==2){
      
        if(this.favourite_child_songs.length>=0){
        var index = this.favourite_child_songs.indexOf(song.song_no);
        
        if(index == -1){
          this.favourite_child_songs.push(song.song_no);
          localStorage.setItem('favourite_children', JSON.stringify(this.favourite_child_songs)); 
          this.song.is_fovourite = 1;
          this.isFav = true;
          this.httpService.showToast('Added to children favourites songs');
        }else{
          this.favourite_child_songs.splice(index,1);
          localStorage.setItem('favourite_children', JSON.stringify(this.favourite_child_songs));  
          this.song.is_fovourite = 0;
          this.isFav = false;
          this.httpService.showToast('Removed from children favourites songs');
        }
      }
    }else{
    if(this.favourite_main_songs.length>=0){
      var index = this.favourite_main_songs.indexOf(song.song_no);
      if(index == -1){
        this.favourite_main_songs.push(song.song_no);
        localStorage.setItem('favourite_main', JSON.stringify(this.favourite_main_songs)); 
        this.song.is_fovourite = 1;
        this.isFav = true;
        this.httpService.showToast('Added to main favourites songs');
      }else{
        this.favourite_main_songs.splice(index,1);
        localStorage.setItem('favourite_main', JSON.stringify(this.favourite_main_songs));  
        this.song.is_fovourite = 0;
        this.isFav = false;
        this.httpService.showToast('Removed from main favourites songs');
      }
    }
   }
  }

}
