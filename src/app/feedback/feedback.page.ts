import { Component, OnInit } from '@angular/core';
// import { EmailComposer } from '@ionic-native/email-composer/ngx';
// import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

import { HttpServiceService } from '../http-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  feedback:any;
  public submitAttempt: boolean = false;
  public feedbackForm: FormGroup;
  constructor(
    public httpService:HttpServiceService,
	public formBuilder: FormBuilder
    // private emailComposer: EmailComposer
	) 
  { 
    this.feedback='';
	this.feedbackForm = formBuilder.group({
		feedback: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
	});
  	localStorage.setItem('pageName','FeedbackPage');
  }

  ngOnInit() {
  }

  sendEmail(){
	this.submitAttempt = true;
	if(this.feedbackForm.valid){
		this.httpService.showToast('Feedback sent succesfully');
		// this.emailComposer.getClients().then((apps: ['gmail']) => {
		// 	this.emailComposer.hasClient().then( (isValid: boolean) => {
		// 		if (isValid) {
		// 			this.emailComposer.hasAccount().then((isValid: boolean) => {
		// 				if (isValid) {
		// 					this.emailComposer.isAvailable().then( (available: boolean) => {
		// 						if(available) {
		// 							let email = {
		// 								to: 'symphonygospelteam@gmail.com',
		// 								cc: '',
		// 								bcc: [],
		// 								attachments: [],
		// 								subject: 'Jeevaswaraalu Feedback',
		// 								body: this.feedback,
		// 								isHtml: true
		// 							};
								
		// 							 // Send a text message using default options
		// 							 this.emailComposer.open(email);
		// 						}
		// 					   });
		// 				}
		// 			   });
		// 		}
		// 	   });
		//  });
	}
 
  }

//   sendEmails(){
// 	this.submitAttempt = true;
// 	if(!this.feedbackForm.valid){
// 		this.emailComposer.getClients().then((apps: []) => {
// 			this.emailComposer.hasClient().then(apps, (isValid: boolean) => {
// 				if (isValid) {
// 					this.emailComposer.hasAccount().then((isValid: boolean) => {
// 						if (isValid) {
// 						  // Now we know we have a valid email account configured
// 						}
// 					   });
// 				}
// 			   });
// 		 });
// 		this.emailComposer.isAvailable().then(app, (available: boolean) => {
// 			if(available) {
// 			  // Now we know we can send an email, calls hasClient and hasAccount
// 			  // Not specifying an app will return true if at least one email client is configured
// 			}
// 		   });
//   	/*this.emailComposer.isAvailable().then((available: boolean) =>{
// 			if(available) {*/
// 				let email = {
// 					to: 'symphonygospelteam@gmail.com',
// 					cc: '',
// 					bcc: [],
// 					attachments: [],
// 					subject: 'Jeevaswaraalu Feedback',
// 					body: this.feedback,
// 					isHtml: true
// 				};
// 				this.emailComposer.open(email).then(success=>{
// 					this.httpService.showToast(success);
// 				},error=>{
// 					this.httpService.showToast(error);
// 				});
// 			/*}else{
// 				this.httpService.showToast("Gmail Not Available");
// 			}*/
// 		/*},
// 		error=>{});*/
		
// 	}
	// }

}
