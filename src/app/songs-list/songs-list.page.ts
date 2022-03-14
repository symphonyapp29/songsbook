import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { ServiceNameService } from '../service-name.service';
import { ActivatedRoute, convertToParamMap,Router,NavigationExtras } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient,HttpHeaders,HttpErrorResponse
} from '@angular/common/http';
import { ModalController,LoadingController } from '@ionic/angular';

import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.page.html',
  styleUrls: ['./songs-list.page.scss'],
})
export class SongsListPage implements OnInit {
  public items;
  public allItems;
  public songsType;
  searchInput:string;
  showModal: boolean;
  favourite_type:string;
  isPayment:any;
  originalData:any;
  isFav:any;
  loading: any;
  constructor(
        public httpService:HttpServiceService,
        public serviceName:ServiceNameService,
        private router: Router,
        private route: ActivatedRoute,
        private http: HTTP,
        public httpClient:HttpClient,
        public loadingCtrl:LoadingController,
        public modalController: ModalController
      ) 
  { 
    
    this.showModal = false;
    this.items = [];
    this.allItems=[];
    this.originalData = [];
    this.isFav = false;
    this.favourite_type = "main_book";
    
    this.isPayment = this.httpService.userType('payment_status');
    localStorage.setItem('pageName','SongsListPage');
  }

  ngOnInit() {
    // console.log('sonlist page');
    this.getSong();
  }

  getSong(){

    if(JSON.parse(localStorage.getItem("mainSongBookSortedData")).length==0 || JSON.parse(localStorage.getItem("mainSongBook")).length==0){
      this.httpService.loaderMainSongsStart();
      let params = {
        email: this.httpService.userType('email'),
        user_id:this.httpService.userType('id'),
        device_id: this.httpService.userType('device_id')
      }
      this.httpService.httpServicePost(this.serviceName.main_songs, params).subscribe(
        data => {

          this.httpService.loaderStop();

          // let data:any= JSON.parse(data1);

          let temp = data[0].data;
          // alert(temp);
          this.items = temp;
          temp.forEach((x) => {
            this.originalData.push(Object.assign({}, x));
          });

          localStorage.setItem("mainSongBook",JSON.stringify(temp));
          localStorage.setItem('mainSongBookOrginalData',JSON.stringify(this.originalData));
          this.allItems = this.items;
          this.items.sort(function(a, b) {
              return parseFloat(a.index_no) - parseFloat(b.index_no);
          });
          localStorage.setItem('mainSongBookSortedData',JSON.stringify(this.items));
          this.httpService.loaderStop();
        
          
        },
        error => {
          this.httpService.loaderStop();
          this.httpService.showToast("Data loading error");
        });
    }else{
      this.httpService.loaderStart();
      let data = JSON.parse(localStorage.getItem("mainSongBookSortedData"));
      this.items = data;
      this.httpService.loaderStop();
    }
  }

  getSongPre() {
    // alert(localStorage.getItem("mainSongBookSortedData"));
    // alert(JSON.stringify(localStorage.getItem("mainSongBookSortedData")));
    if(JSON.parse(localStorage.getItem("mainSongBookSortedData")).length==0 || JSON.parse(localStorage.getItem("mainSongBook")).length==0){
      let params = {
        email: this.httpService.userType('email'),
        user_id:this.httpService.userType('id'),
        device_id: this.httpService.userType('device_id')
      }

    // let params = {
    //   email: "gollapallyjoshua@gmail.com",
    //   user_id:21945,
    //   device_id: 'f7e2851d-0b62-4332-8726-8392a20fa2d2'
    // }
  //  alert(JSON.stringify(params));
  
    this.httpService.loaderMainSongsStart();
    
    this.httpService.getMainSongBook();
   
    this.http.post(this.serviceName.main_songs, params, {})
    .then(data1 => {
       
        let data:any= JSON.parse(data1.data);

        let temp = data[0].data;
        this.items = temp;
        temp.forEach((x) => {
          this.originalData.push(Object.assign({}, x));
        });

        localStorage.setItem("mainSongBook",JSON.stringify(temp));
        localStorage.setItem('mainSongBookOrginalData',JSON.stringify(this.originalData));
        this.allItems = this.items;
        this.items.sort(function(a, b) {
             return parseFloat(a.index_no) - parseFloat(b.index_no);
        });
        localStorage.setItem('mainSongBookSortedData',JSON.stringify(this.items));
        this.httpService.loaderStop();
        
    })
    .catch(error => {
      this.httpService.loaderStop();
      this.items = [];
      this.allItems = [];
      this.originalData = [];
      localStorage.setItem("mainSongBook",JSON.stringify([]));
      localStorage.setItem("mainSongBookOrginalData",JSON.stringify([]));
      localStorage.setItem("mainSongBookSortedData",JSON.stringify([]));
      // localStorage.setItem("childrenSongBook",JSON.stringify([]));
      this.httpService.showToast(error.status);
    });

    }else{
      
      // alert('in else'+JSON.stringify(localStorage.getItem("mainSongBookSortedData")));
        this.httpService.loaderStart();
        let data = JSON.parse(localStorage.getItem("mainSongBookSortedData"));
        this.items = data;
        this.httpService.loaderStop();
    }
  }

 
 
  // ionViewWillEnter() {
  //   // alert('hello');
  //   let self =  this;
  //   if(JSON.parse(localStorage.getItem("mainSongBookSortedData")).length==0 || JSON.parse(localStorage.getItem("mainSongBook")).length==0){
  //     self.getSong();
  //   }else{
  //       // this.httpService.loaderStart();
  //       let data = JSON.parse(localStorage.getItem("mainSongBookSortedData"));
  //       self.items = data;
  //       // this.httpService.loaderStop();
  //   }
  // }
   

  selectedSong(song){
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        songBook:"Main Book",
        bookType:1,// 1 means main songs
        song: JSON.stringify(song),
        isFav:this.isFav
      }
    };
    
    this.router.navigate(['song-page'],navigationExtras);
    // this.navCtrl.push(MainBookPage,{current_song:song,firstTime:false,isFav:this.isFav,songs:this.originalData,book_name:this.songsType,fav_type:this.params.data.favorite_type});
  }

  membershipPage(){
    this.isPayment = this.httpService.userType('payment_status');

    if(this.isPayment==0){
      this.router.navigate(['membership']);
    }else{
      //update the songs
      this.getMainSongs();
    }
  }

  getMainSongs(){
    let params = {
      email: this.httpService.userType('email'),
      user_id:this.httpService.userType('id'),
      device_id: this.httpService.userType('device_id')
    }
        
    this.httpService.loaderMainSongsStart();
    this.httpService.httpServicePost(this.serviceName.main_songs, params).subscribe(
      data => {
        // let data:any= JSON.parse(data1.data);
        
        let temp = data[0].data;
        let originalData = [];
        // this.items = temp;
        this.items = temp;
        temp.forEach((x) => {
          originalData.push(Object.assign({}, x));
        });
    
        localStorage.setItem("mainSongBook",JSON.stringify(temp));
        localStorage.setItem('mainSongBookOrginalData',JSON.stringify(originalData));
        // this.allItems = this.items;
        temp.sort(function(a, b) {
          return parseFloat(a.index_no) - parseFloat(b.index_no);
        });
        localStorage.setItem('mainSongBookSortedData',JSON.stringify(temp));
        // alert(JSON.parse(localStorage.getItem("mainSongBookSortedData")).length);
        this.httpService.loaderStop();
        // this.getChildrenSongs();
      },
      error => {
          this.httpService.loaderStop();
          localStorage.setItem("mainSongBook",JSON.stringify([]));
          localStorage.setItem("mainSongBookOrginalData",JSON.stringify([]));
          localStorage.setItem("mainSongBookSortedData",JSON.stringify([]));
          this.httpService.showToast(error.status);
      });
  }

  getMainSongsPre() {
    		
      let params = {
        email: this.httpService.userType('email'),
        user_id:this.httpService.userType('id'),
        device_id: this.httpService.userType('device_id')
      }
          
      this.httpService.loaderMainSongsStart();
      
      this.http.post(this.serviceName.main_songs, params, {})
      .then(data1 => {
        
        let data:any= JSON.parse(data1.data);
        
        let temp = data[0].data;
        let originalData = [];
        // this.items = temp;
        this.items = temp;
        temp.forEach((x) => {
          originalData.push(Object.assign({}, x));
        });
    
        localStorage.setItem("mainSongBook",JSON.stringify(temp));
        localStorage.setItem('mainSongBookOrginalData',JSON.stringify(originalData));
        // this.allItems = this.items;
        temp.sort(function(a, b) {
          return parseFloat(a.index_no) - parseFloat(b.index_no);
        });
        localStorage.setItem('mainSongBookSortedData',JSON.stringify(temp));
        // alert(JSON.parse(localStorage.getItem("mainSongBookSortedData")).length);
        this.httpService.loaderStop();
        // this.getChildrenSongs();
      })
      .catch(error => {
        this.httpService.loaderStop();
      
          localStorage.setItem("mainSongBook",JSON.stringify([]));
            localStorage.setItem("mainSongBookOrginalData",JSON.stringify([]));
            localStorage.setItem("mainSongBookSortedData",JSON.stringify([]));
        this.httpService.showToast(error.status);
      });
    }
    
  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchPage,
      componentProps: {
        'songBook': 'main_songs'
      }
    });
    modal.onDidDismiss().then((detail) => {
      if (detail !== null && detail.data!== undefined) {
        this.selectedSong(detail.data);
      }
    });
    return await modal.present();
  }

}
