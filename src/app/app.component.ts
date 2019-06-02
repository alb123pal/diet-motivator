import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthorizeUserService } from './services/autorize-user.service';

import { MessagingService } from './services/messaging.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  title = 'diet-motivator';
  isLogged = false;
  message;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public userService: AuthorizeUserService,
    private messagingService: MessagingService,
    private af: AngularFirestore
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.userService.isAuthorize$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
    this.messagingService.requestPermission("user001");
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
