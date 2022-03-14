import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  

  constructor(private emailComposer: EmailComposer,
	private callNumber: CallNumber,
	public httpService:HttpServiceService,) { }

  ngOnInit() {
  }

  sendEmail()
  {
      /*this.emailComposer.isAvailable().then((available: boolean) =>{
			if(available) {*/
				let email = {
					to: 'symphonygospelteam@gmail.com',
					cc: '',
					bcc: [],
					attachments: [],
					subject: 'Jeevaswaraalu Contact',
					body: '',
					isHtml: true
				};
				this.emailComposer.open(email).then(success=>{
					this.httpService.showToast(success);
				},error=>{
					this.httpService.showToast(error);
				});
			/*}else{
				this.httpService.showToast("Gmail Not Available");
			}*/
		/*},
		error=>{});*/
  }

  dialNumber(){
    this.callNumber.callNumber("9440210329", true)
	.then(res => console.log('Launched dialer!', res))
	.catch(err => console.log('Error launching dialer', err));
  }

}
