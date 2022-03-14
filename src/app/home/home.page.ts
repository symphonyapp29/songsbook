import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
// import { Platform,AlertController,IonRouterOutlet,NavController } from '@ionic/angular';
// import { Location } from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;
  constructor( private router: Router,
    // private location: Location,
    // public alertController: AlertController,
    // private platform: Platform
    ) { 
    // this.platform.backButton.subscribeWithPriority(10, () => {
      
    //   if (!this.routerOutlet.canGoBack()) {
    //     this.presentAlertConfirm();
    //   }else{
    //     this.location.back();
    //   }
    // });
  }

  ngOnInit() { 
  }

  mainSongs(){
    this.router.navigateByUrl('songs-list');
  }

  childrenSongs(){
    this.router.navigateByUrl('children-songs');
  }

  proVersion(){
    this.router.navigateByUrl('membership');
  }

  aboutJeevaSwaralu(){
    this.router.navigateByUrl('about-jeevaswaralu');
  }

  contact(){
    this.router.navigateByUrl('contact-us');
  }

  aboutSymphony(){
    this.router.navigateByUrl('about-symphony');
  }

  feedback(){
    this.router.navigateByUrl('feedback');
  }

  // async presentAlertConfirm() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Do you want to exit the app?',
  //     buttons: [
  //       {
  //         text: 'No',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Yes',
  //         cssClass: 'primary',
  //         handler: () => {
  //           console.log('Confirm Okay');
  //           navigator['app'].exitApp();
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

}
