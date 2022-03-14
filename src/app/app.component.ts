import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, convertToParamMap,Router,NavigationExtras } from '@angular/router';
import { Platform,MenuController,AlertController,IonRouterOutlet,NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Location } from "@angular/common";
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { HttpServiceService } from './http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
}) 
export class AppComponent implements OnInit {
  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;
  public selectedIndex = 0;
  favoriteSongs:any;
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'book',
      subMenu:[]
    },
    {
      title: 'Main Book',
      url: 'songs-list',
      icon: 'book',
      subMenu:[]
    },
    {
      title: 'Children Songs',
      url: 'children-songs',
      icon: 'people',
      subMenu:[]
    },
    {
      title: 'Favorite Songs',
      url: 'favourite-songs',
      icon: 'heart',
      subMenu:[{
        title: 'Main Songs',icon:'ios-heart-outline',showDetails:false
      },
      {title: 'Children Songs',icon:'ios-heart-outline',showDetails:false}]
    },
    {
      title: 'Pro Version',
      url: 'membership',
      icon: 'cart',
      subMenu:[]
    },
    {
      title: 'About Symphony',
      url: 'about-symphony',
      icon: 'brush',
      subMenu:[]
    },
    {
      title: 'About Jeevaswaralu',
      url: 'about-jeevaswaralu',
      icon: 'headset',
      subMenu:[]
    },
    {
      title: 'Feedback',
      url: 'feedback',
      icon: 'newspaper',
      subMenu:[]
    },
    {
      title: 'Contact Us',
      url: 'contact-us',
      icon: 'chatbubbles',
      subMenu:[]
    }
  ];
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    public menuCtrl: MenuController,
    private router: Router,
    private location: Location,
    public alertController: AlertController,
    private httpService:HttpServiceService,
    private screenOrientation: ScreenOrientation,
    private navCtrl:NavController
  ) {
    
    this.initializeApp();
   
  }

  initializeApp() {
    this.favoriteSongs=[];
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#f76406');
      this.splashScreen.hide();
      this.oneSignal.startInit('b3f70721-6dbc-4241-bdd7-f0b4c8ec8110', '326347457067');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe((data) => {
      });
      this.oneSignal.handleNotificationOpened().subscribe((data) => {

      });
      this.oneSignal.enableSound(true);
      this.oneSignal.endInit();
      this.oneSignal.getIds().then(data =>{
        this.httpService.setter('oneSignalId',data.userId);
       }
      );

      this.platform.backButton.subscribeWithPriority(10, () => {
      // this.routerOutlet.sw
        if (!this.routerOutlet.canGoBack()) {
          this.presentAlertConfirm();
        }else{
          this.location.back();
        }
      });
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
    // alert(localStorage.getItem('mainSongBook'));
    if(localStorage.getItem('mainSongBook')==null){
      localStorage.setItem("mainSongBook",JSON.stringify([]));
    }

    if(localStorage.getItem('mainSongBookOrginalData')==null){
      localStorage.setItem("mainSongBookOrginalData",JSON.stringify([]));
    }

    if(localStorage.getItem('mainSongBookSortedData')==null){
      localStorage.setItem("mainSongBookSortedData",JSON.stringify([]));
    }

    if(localStorage.getItem('childrenSongBook')==null){
      localStorage.setItem("childrenSongBook",JSON.stringify([]));
    }

    if(localStorage.getItem('childrenSongBookSortedData')==null){
      localStorage.setItem("childrenSongBookSortedData",JSON.stringify([]));
    }

    if(localStorage.getItem('childrenSongBookOrginalData')==null){
      localStorage.setItem("childrenSongBookOrginalData",JSON.stringify([]));
    }
    // else{

    //   this.nav
    //    // this.rootPage = SongsListPage;
    // }

    if(localStorage.getItem('favourite_main')==null){
      localStorage.setItem('favourite_main',JSON.stringify([]));
    }
    if(localStorage.getItem('favourite_children')==null){
      localStorage.setItem('favourite_children',JSON.stringify([]));
    }
    // this.navCtrl.navigateRoot(['songs-list']);
  }

  ngOnInit() {
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
  }

  openPage(page) {
    
    if(page.title=='Main Book'){
      this.menuCtrl.close();
      let navigationExtras: NavigationExtras = {
        queryParams: {
          song_type:"main_book",
          favorite_type:'main_book'
        }
      };
      // this.router.navigate
      this.router.navigateByUrl(page.url,navigationExtras);
      // this.nav.setRoot(page.component,{song_type: 'main_book',favorite_type:'Main Book'});
    }else if(page.title=='Children Songs'){
      
      this.menuCtrl.close();
      let navigationExtras: NavigationExtras = {
        queryParams: {
          song_type:"children_book",
          favorite_type:'children_book'
        }
      };
      this.router.navigateByUrl(page.url,navigationExtras);
    }else if(page.title=='Favorite Songs'){
      for(var value of page.subMenu){
        value.showDetails = !value.showDetails;
      }
    }else{
      this.menuCtrl.close();
      this.router.navigateByUrl(page.url);
    }
  }

  openSubmenuPage(favorite_type){
    
    localStorage.setItem('favorite_type',favorite_type);
    this.menuCtrl.close();
    
    if(favorite_type=="Children Songs"){
      let navigationExtrs: NavigationExtras = {
        queryParams: {
          song_type:"favorite_book",
          favorite_type:favorite_type
        }
      };
      
      this.router.navigate(['favourite-children-songs-list'],navigationExtrs); 
    }else if(favorite_type=="Main Songs"){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          song_type:"favorite_book",
          favorite_type:favorite_type
        }
      };
      // localStorage.setItem('favorite_type','main_songs');
      this.router.navigate(['favourite-main-songs-list'],navigationExtras);
    }
   
    
    // this.nav.setRoot(page.component,{song_type: 'favorite_book',favorite_type:favorite_type});
  } 

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }
}
