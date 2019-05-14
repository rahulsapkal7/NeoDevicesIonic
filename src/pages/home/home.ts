import { Component } from '@angular/core';
import { DeviceListPage } from '../device-list/device-list';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

@Component({

  selector: 'page-home',
  templateUrl: 'home.html',
  
})
export class HomePage {
  
  tab: any;
  android = "Android";
  ios = "Ios";
  windows = "Windows";
  constructor(public navCtrl: NavController,public storage: Storage) {
    this.tab = DeviceListPage;
    storage.get('userLoggedInFlag').then((loggedIn) => {
      console.log("inside home ts ",loggedIn);
      // Globals.globals.userAccessToken = userAccessToken;
      // this.storage.get('user');
      // if (loggedIn) {
      //   this.rootPage = HomePage;
      // } else {
      //   this.rootPage = HomePage;
      // }
      
    });
  }
   
  selectedTab(e) {
    
    console.log("on Every click function",e);
    this.navCtrl.push(DeviceListPage, {e});
    
  }
 
}