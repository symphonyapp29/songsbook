import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule,HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { Toast } from '@ionic-native/toast/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { HTTP } from '@ionic-native/http/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot({
      rippleEffect: false,
      mode:'md'
    }),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    Toast,
    HTTP,
    EmailComposer,
    CallNumber,
    ScreenOrientation,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
