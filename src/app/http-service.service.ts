import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { catchError,map,retry } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { ServiceNameService } from './service-name.service';
import { LoadingController } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { promise } from 'protractor';
// import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';

@Injectable({
  providedIn: 'root' 
})
export class HttpServiceService {
  
  options:any;
  user_id:any;
  loading: any;
  constructor(private http: HttpClient,
    public loadingCtrl:LoadingController,
    public serviceName:ServiceNameService,
    
    // private themeableBrowser: ThemeableBrowser,
    private oneSignal:OneSignal,
    private toast:Toast) {
      let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = { headers: headers };
    }

    getMainSongBook(){
      return JSON.parse(localStorage.getItem('mainSongBook'));
    }
    getChildrenSongBook(){
      return JSON.parse(localStorage.getItem('childrenSongBook'));
    }
    getMainFavouriteSongBook(){
      return JSON.parse(localStorage.getItem('favourite_main'));
    }
    getChildrenFavouriteSongBook(){
      return JSON.parse(localStorage.getItem('favourite_children'));
    }


     /** Post service call, to all database calls */
  httpServicePost(service_name, param) {


    // if (this.globalMethods.checkNetwork()) {
      return this.http.post(service_name, param, this.options).
      pipe(
      	// retry(3),
      	map(res => res),
      	catchError(this.handleError)
      );
    // } else {
    //   this.globalMethods.showToast("Check Network Connection");
    // }
  }

    mainSongBook(){
       let promise =  new Promise((resolve, reject) => {
          // if(JSON.parse(localStorage.getItem("mainSongBook")).length==0){
          //   let loading = this.loadingCtrl.create({
          //   message: "Main Songs Loading from Server..."
          // });
          //  this.loading.present();
          let params={
              email: this.userType('email'),
              user_id:this.userType('id'),
              device_id: this.getter('oneSignalId')
          }
          // alert('parames');
            this.httpServicePost(this.serviceName.serviceUrl+this.serviceName.main_songs,params).subscribe(
          data1 => { 
          //  this.loading.loaderStop();
          //  alert(JSON.stringify(data1));
           console.log(JSON.stringify(data1))
              localStorage.setItem("mainSongBook",JSON.stringify(data1[0].data));
              if(JSON.parse(localStorage.getItem("childrenSongBook")).length==0){
                  this.childrenSongBook().then();
              }  
              resolve(JSON.parse(localStorage.getItem("mainSongBook")));
          },error=>{
                    //this.loading.dismissAll();
                    // alert(error);
                    this.showToast("Main songs loading failed, Check Network connection");
                    reject(error);
          });
          // }else{
          //     resolve(JSON.parse(localStorage.getItem("mainSongBook")));
          // }
      }); 

      return promise;
          
    }
     childrenSongBook(){
      let promise = new Promise((resolve, reject) => {
          // if(JSON.parse(localStorage.getItem("childrenSongBook")).length==0){
          //   let loading =  this.loadingCtrl.create({
          //     message: "Children Songs Loading from Server..."
          // });
          // loading.present();
          let params={
              email: this.userType('email'),
              user_id:this.userType('id'),
              device_id:this.userType('device_id')
          }
            this.httpServicePost(this.serviceName.serviceUrl+this.serviceName.children_songs,params).subscribe(
          data1 => {
            console.log('children songs',JSON.stringify(data1));
            // this.loading.dismissAll();
             localStorage.setItem("childrenSongBook",JSON.stringify(data1[0].data));
              resolve(JSON.parse(localStorage.getItem("childrenSongBook")));
          },error=>{
            // this.loading.dismissAll();
                    this.showToast("Children songs loading failed, Check Network connection");
                    reject(error);
          });
          // }else{
          //     resolve(JSON.parse(localStorage.getItem("childrenSongBook")));
          // }
      }); 

      return promise;
    }
  
    getDataOld(url){
      //return this.http.post(url, '' , this.options).timeout(60000).map( res => res.json()).catch(this.handleError);
    }

    getData(url) {
      
        return this.http.post(url, '', this.options).
        pipe(
          // retry(3),
          map(res => res),
          catchError(this.handleError)
        );
      
    }

    async loaderStart() {
      this.loading = await this.loadingCtrl.create({
        message: 'Please wait...',
        duration: 2000
      });
      await this.loading.present();
     
    }

    async loaderMainSongsStart() {
      this.loading = await this.loadingCtrl.create({
        message: 'Main Songs Loading from Server...',
        duration: 11000
      });
      await this.loading.present();
    }

    async loaderchildrenSongsStart() {
      this.loading = await this.loadingCtrl.create({
        message: 'Children Songs Loading from Server...',
        duration: 9000,
        cssClass:"custom-loading"
      });
      await this.loading.present();
    }
  
     async loaderStop() {
      if (this.loading) {
        await this.loading.dismiss();
      }
    }

    // async loaderStart(){
    //   const loading = await this.loadingCtrl.create({
    //     message: 'Please wait...',
    //     duration: 2000
    //   });
    //   await loading.present();
      
    // }
    // async loaderStop(){
    //   const loading = await this.loadingCtrl.create({
    //     message: 'Please wait...',
    //     duration: 2000
    //   });
    //   await loading.onDidDismiss();
    // }

    async loaderAllSongsStart(){
      const loading = await this.loadingCtrl.create({
        message: 'Loading all songs...'
      });
      await loading.present();
      
    }

    spinnerStart(id){
      document.getElementById(id).style.display = 'block';
    }
    spinnerStop(id){
      document.getElementById(id).style.display = 'none';
    }

    httpServicePostOld(service_name,param){
      //return this.http.post(service_name, param , this.options).timeout(60000).map( res => res.json()).catch(this.handleError);
    }

    // httpServicePost(service_name, param) {
      
    //     return this.http.post(service_name, param, this.options).
    //     pipe(
    //       // retry(3),
    //       map(res => res),
    //       catchError(this.handleError)
    //     );
      
    // }

    httpServiceGet(service_name) {
      // if (this.globalMethods.checkNetwork()) {
        return this.http.get(service_name, this.options).
          pipe(
            retry(3),
            map(res => res),
            catchError(this.handleError)
          );
       
      // } else {
      //   this.globalMethods.showToast("Check Network Connection");
      // }
    }

    httpServiceGetOLD(service_name){
     // return this.http.get(this.serviceName.serviceLogin + service_name).timeout(60000).map(res => res.json()).catch(this.handleError);
    }
    httpSocialLoginsGet(url){
     // return this.http.get(url).timeout(60000).map(res => res.json()).catch(this.handleError);
    }
    setter(key,data){
      localStorage.setItem(key, data);
    }    
    getter(key){
      return localStorage.getItem(key);
    }
    clear(){
      localStorage.clear();
    }
    showToast(msg){
      this.toast.show(msg, '5000', 'bottom').subscribe(toast => {});
    }
    hideToast(){
      this.toast.hide();
    }
    userType(property){
      let userDetails = JSON.parse(this.getter(this.serviceName.userProfile));
      if(!userDetails){
         userDetails = { "id": "", "updated_on": "", "ip_address": "", "username": "", "password": "", "salt": null, "email": "", "activation_code": "",
                        "forgotten_password_code": null, "forgotten_password_time": null, "remember_code": null, "created_on": "", "last_login": null,
                        "active": "0", "first_name": "", "last_name": "", "phone": null, "device_id": "", "registered_by": "", "payment_status": "0"
        };
          this.user_id = userDetails[""+property+""];
          if(this.user_id){
            return this.user_id;
          }else{
            return "";
          }
      }else{
          this.user_id = userDetails[""+property+""];
          if(this.user_id){
            return this.user_id;
          }else{
            return "";
          }
      }
    }
    
    /*doPayment(data){
      return new Promise((resolve, reject) => {
        let event_details;
        let urlParams = this.serviceName.payU+"dopayMobile?email="+data.email+"&name="+data.name+"&amount="+data.amount+"&userId="+data.userId+"&order_by_device_id="+data.device_id;
              const options: ThemeableBrowserOptions = {
                   statusbar: {
                     color: '#ffffffff'
                   },
                   toolbar: {
                     height: 44,
                     color: '#f0f0f0ff'
                   },
                   title: {
                     color: '#003264ff',
                     showPageTitle: true,
                     staticText: 'PayU Money Payment'
                   },
                   backButton: {
                     wwwImage: 'assets/img/browser/back.png',
                     wwwImagePressed: 'assets/img/browser/back_pressed.png',
                     wwwImageDensity: 3,
                     align: 'left',
                     event: 'backPressed'
                   },
                   closeButton: {
                     wwwImage: 'assets/img/browser/close.png',
                     wwwImagePressed: 'assets/img/browser/close_pressed.png',
                     wwwImageDensity: 3,
                     align: 'right',
                     event: 'closePressed'
                   },
                   backButtonCanClose: true
                 };
                 const browser: ThemeableBrowserObject = this.themeableBrowser.create(urlParams, '_blank', options);
                   resolve(browser);
               });
    }*/

    // private handleError(error){
    //   return Observable.throw(error.json().error || 'Server error');
    // }

    /** Error handler to all service calls */
  private handleError(error: HttpErrorResponse) {
	  if (error.error instanceof ErrorEvent) {
	    // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      alert('An error occurred:'+ error.error.message);
	  } else {
	    // The backend returned an unsuccessful response code.
	    // The response body may contain clues as to what went wrong,
	    console.error(
	      `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        alert('Backend return error');
        
	  }
	  // return an observable with a user-facing error message
	  return throwError(
	    'Something bad happened; please try again later.');
	}
}
