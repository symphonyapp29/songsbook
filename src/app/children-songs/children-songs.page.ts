import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { ServiceNameService } from '../service-name.service';
import { ActivatedRoute, convertToParamMap,Router,NavigationExtras } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient,HttpHeaders,HttpErrorResponse
} from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { SearchPage } from '../search/search.page';


@Component({
  selector: 'app-children-songs',
  templateUrl: './children-songs.page.html',
  styleUrls: ['./children-songs.page.scss'],
})
export class ChildrenSongsPage implements OnInit {
  public items;
  public allItems;
  public songsType;
  searchInput:string;
  showModal: boolean;
  favourite_type;
  isPayment:any;
  showIndexTitles;
  originalData:any;
  isFav:any;
  book_name:any;
  constructor(  public httpService:HttpServiceService,
    public serviceName:ServiceNameService,
    private http: HTTP,
    public httpClient:HttpClient,
    public modalController: ModalController,
    private router: Router) {
      this.showModal = false;
    this.items = [];
    this.allItems=[];
    this.originalData = [];
    this.isFav = false;
    this.book_name="";
    this.isPayment = this.httpService.userType('payment_status');
    localStorage.setItem('pageName','ChildrenSongsPage');
  }

  ngOnInit() {
    this.getSong();
  }

  getSong(){
    if(JSON.parse(localStorage.getItem("childrenSongBookSortedData")).length==0 || JSON.parse(localStorage.getItem("childrenSongBook")).length==0){
      let params = {
          email: this.httpService.userType('email'),
          user_id:this.httpService.userType('id'),
          device_id: this.httpService.userType('device_id')
      }
      this.httpService.loaderchildrenSongsStart();
      this.httpService.httpServicePost(this.serviceName.children_songs, params).subscribe(
        data => {

          this.httpService.loaderStop();

          // let data:any= JSON.parse(data1.data);
        
          let temp = data[0].data;
          this.items = temp;
          temp.forEach((x) => {
            this.originalData.push(Object.assign({}, x));
          });
          
          localStorage.setItem("childrenSongBook",JSON.stringify(temp));
          localStorage.setItem('childrenSongBookOrginalData',JSON.stringify(this.originalData));
          this.allItems = this.items;
          this.items.sort(function(a, b) {
            return parseFloat(a.index_no) - parseFloat(b.index_no);
          });
          localStorage.setItem('childrenSongBookSortedData',JSON.stringify(this.items));
          
          this.httpService.loaderStop();
          
          
        },
        error => {
          this.httpService.loaderStop();
          this.httpService.showToast("Data loading error");
        });
    }else{
        this.httpService.loaderStart();
        let data = JSON.parse(localStorage.getItem("childrenSongBookSortedData"));

        this.items = data;

        this.httpService.loaderStop();
    }
  }

  getSongPre() {
    if(JSON.parse(localStorage.getItem("childrenSongBookSortedData")).length==0 || JSON.parse(localStorage.getItem("childrenSongBook")).length==0){
      let params = {
        email: this.httpService.userType('email'),
        user_id:this.httpService.userType('id'),
        device_id: this.httpService.userType('device_id')
    }
       
    this.httpService.loaderchildrenSongsStart();
    this.http.post(this.serviceName.children_songs, params, {})
    .then(data1 => {
      
        let data:any= JSON.parse(data1.data);
        
        let temp = data[0].data;
        this.items = temp;
        temp.forEach((x) => {
          this.originalData.push(Object.assign({}, x));
        });
        
        localStorage.setItem("childrenSongBook",JSON.stringify(temp));
        localStorage.setItem('childrenSongBookOrginalData',JSON.stringify(this.originalData));
        this.allItems = this.items;
        this.items.sort(function(a, b) {
          return parseFloat(a.index_no) - parseFloat(b.index_no);
        });
        localStorage.setItem('childrenSongBookSortedData',JSON.stringify(this.items));
        
        this.httpService.loaderStop();
    })
    .catch(error => {
      this.httpService.loaderStop();
      this.items = [];
      this.allItems = [];
      this.originalData = [];
    

    });

    }else{
                  
      this.httpService.loaderStart();
      let data = JSON.parse(localStorage.getItem("childrenSongBookSortedData"));
        
      this.items = data;
        
      this.httpService.loaderStop();
    }
  }

  // ionViewWillEnter() {
  //   let self = this;
  //   if(JSON.parse(localStorage.getItem("childrenSongBookSortedData")).length==0 || JSON.parse(localStorage.getItem("childrenSongBook")).length==0){
  //     self.getSong();
  //   }else{
  //     // this.httpService.loaderStart();
  //     let data = JSON.parse(localStorage.getItem("childrenSongBookSortedData"));
  //     self.items = data;
  //     // this.httpService.loaderStop();
  //   }
 
  // }

  
  organiseData(data){
    this.items = data;
    this.items.sort(function(a, b) {
      return parseFloat(a.song_no) - parseFloat(b.song_no);
    });
    this.allItems = this.items;
    // console.log('organiseData');
  }
  
  // organiseFavouriteData(data,fav_data){
    
  //   this.items = [];
  //   this.allItems = [];
  //   if(fav_data.length>0){
  //     for (let entry of data) {
  //       this.showIndexTitles = this.items.length==0 ? false : true;
  //       var index = fav_data.indexOf(entry.song_no);
  //       if(index!=-1){
  //         this.items.push(entry);
  //         this.allItems.push(entry);
  //         this.originalData = this.items;
  //       }
  //     }
  //   }
  // }

  selectedSong(song){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        songBook:"Childrens Book",
        bookType:2,// 2 means childrens songs
        song: JSON.stringify(song),
        isFav:this.isFav
        // songs:JSON.stringify(this.originalData)
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
      this.getChildrenSongs();
    }
  }

  getChildrenSongs(){
    let params = {
      email: this.httpService.userType('email'),
      user_id:this.httpService.userType('id'),
      device_id: this.httpService.userType('device_id')
    }
  
    this.httpService.loaderchildrenSongsStart();
    this.httpService.httpServicePost(this.serviceName.children_songs, params).subscribe(
      data => {
        // let data:any= JSON.parse(data1.data);
        
        let temp = data[0].data;
        let originalData = [];
        // this.items = temp;
        this.items = temp;
        temp.forEach((x) => {
          originalData.push(Object.assign({}, x));
        });
    
        localStorage.setItem("childrenSongBook",JSON.stringify(temp));
        localStorage.setItem('childrenSongBookOrginalData',JSON.stringify(originalData));
        // this.allItems = this.items;
        temp.sort(function(a, b) {
          return parseFloat(a.index_no) - parseFloat(b.index_no);
        });
        localStorage.setItem('childrenSongBookSortedData',JSON.stringify(temp));
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

  getChildrenSongsPre() {
		
    let params = {
      email: this.httpService.userType('email'),
      user_id:this.httpService.userType('id'),
      device_id: this.httpService.userType('device_id')
    }
  
  this.httpService.loaderchildrenSongsStart();
  this.http.post(this.serviceName.children_songs, params, {})
  .then(data1 => {
    
    let data:any= JSON.parse(data1.data);
    
    let originalData = [];
    let temp = data[0].data;
    this.items = temp;
    temp.forEach((x) => {
      originalData.push(Object.assign({}, x));
    });
    
    localStorage.setItem("childrenSongBook",JSON.stringify(temp));
    localStorage.setItem('childrenSongBookOrginalData',JSON.stringify(originalData));
    // this.allItems = this.items;
    temp.sort(function(a, b) {
      return parseFloat(a.index_no) - parseFloat(b.index_no);
    });
    localStorage.setItem('childrenSongBookSortedData',JSON.stringify(temp));
    
    this.httpService.loaderStop();
  })
  .catch(error => {
    localStorage.setItem("childrenSongBook",JSON.stringify([]));
        localStorage.setItem("childrenSongBookSortedData",JSON.stringify([]));
        localStorage.setItem("childrenSongBookOrginalData",JSON.stringify([]));
    this.httpService.loaderStop();
      

  });

  
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchPage,
      componentProps: {
        'songBook': 'children_songs'
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
