import { Component } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private sms: SMS, private androidPermissions: AndroidPermissions) {
    this.androidPermissions.requestPermissions(
      [this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

    this.androidPermissions.requestPermission(
      this.androidPermissions.PERMISSION.SEND_SMS).then(
        success => {
        console.log('SEND_SMS: ');
        this.sendSMS();
    });
  }

  sendSMS() {
    const options = {
      replaceLineBreaks: true,
      android: {
        intent: 'INTENT'
      }
    };

    // this.sms.hasPermission().then((elo) =>  {
    //   alert('sms has permission: ' + elo);
    // });

    this.sms.send('792036750', 'Zejdziesz na chwilę na dół. Ma do Ciebie prośbe, prosze').then(() => {
      alert('doszlo');
    }).catch((error) => {
      alert('error:' + error);
    });
  }

}
