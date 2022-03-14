import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { ServiceNameService } from '../service-name.service';
import { ActivatedRoute, convertToParamMap,Router,NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-favourite-main-songs-list',
  templateUrl: './favourite-main-songs-list.page.html',
  styleUrls: ['./favourite-main-songs-list.page.scss'],
})
export class FavouriteMainSongsListPage implements OnInit {

  public items;
  public allItems;
  public songsType;
  searchInput:string;
  showModal: boolean;
  favourite_type:string;
  isPayment:any;
  showIndexTitles;
  originalData:any;
  isFav:any;
  book_name:any;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(
        public httpService:HttpServiceService,
        public serviceName:ServiceNameService,
        private router: Router,
        private route: ActivatedRoute,
        
      ) 
  { 
    this.showModal = false;
    this.items = [];
    this.allItems=[];
    this.originalData = [];
    this.isFav = true;
    this.favourite_type = "main_book";
    this.book_name="";
    this.isPayment = this.httpService.userType('payment_status');
    localStorage.setItem('pageName','FavouriteMainSongsListPage');
  }

  ngOnInit() {
    this.getSong();
  }

  getSong() {
    
    let self = this;
  
    let data = JSON.parse(localStorage.getItem("mainSongBook"));
    
    let favourite_child_array = JSON.parse(localStorage.getItem("favourite_main"));
    self.organiseFavouriteData(data,favourite_child_array);
    
  }

 
  ionViewWillEnter() {
    this.getSong();
  }
 
  
  organiseFavouriteData(data,fav_data){
    
    this.items = [];
    this.allItems = [];
    if(fav_data.length>0){
      for (let entry of data) {
        this.showIndexTitles = this.items.length==0 ? false : true;
        var index = fav_data.indexOf(entry.song_no);
        if(index!=-1){
          this.items.push(entry);
          this.allItems.push(entry);
        }
      }
    }
  }

  selectedSong(song){
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        songBook:"Main Book",
        bookType:1,// 1 means main songs
        song: JSON.stringify(song),
        isFav:true
      }
    };
    
    this.router.navigate(['song-page'],navigationExtras);
    // this.navCtrl.push(MainBookPage,{current_song:song,firstTime:false,isFav:this.isFav,songs:this.originalData,book_name:this.songsType,fav_type:this.params.data.favorite_type});
  }

  membershipPage(){
    this.router.navigate(['membership']);
  }

}
