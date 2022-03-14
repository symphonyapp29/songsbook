import { Injectable } from '@angular/core';

const SERVER_URL = 'http://adapp.symphonygospelteam.com';

@Injectable({
  providedIn: 'root'
})
export class ServiceNameService {

  constructor() { }

  /* Service locations*/
  public serviceUrl = SERVER_URL + '/service/';
  public serviceLogin = SERVER_URL + '/service_login/';
  // public serviceSymphony = SERVER_URL + '/service_symphony/';
  public serviceSymphony = SERVER_URL + '/service/';
                 
  /*Service Names*/
  public registration = this.serviceLogin + 'register';
  public registration_social_login = this.serviceLogin + 'signup';
  public new_registration_social_login = this.serviceLogin + 'nsignup';
  public payU = SERVER_URL + '/PayuMobile/';
  public children_songs = this.serviceSymphony + 'get_children_songs';
  public main_songs = this.serviceSymphony + 'get_main_songs';
  public user_details = this.serviceUrl+'get_user_details';
  public paypal_payment_details = this.serviceUrl+'paypal_payment_details';
  public razor_payment_update = this.serviceSymphony+'razor_payment_update';
  public update_songs = this.serviceSymphony+'update_songs';


  // LocalStorage keys
  public userProfile = 'userProfile';

  // User types
  public guestUser = 0;
}
