import { Component, ViewChild } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { MyListPage } from '../pages/my-list/my-list';
import { Storage } from '@ionic/storage';
import { SideMenuPage } from '../pages/side-menu/side-menu';
// import { HomePage } from '../pages/home/home';
import { ApiData } from '../services/api';



@Component({
  templateUrl: 'app.html',
  providers: [ ApiData ]
  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any ;  

  constructor(platform: Platform, statusBar: StatusBar, private storage: Storage,splashScreen: SplashScreen,  public menuCtrl: MenuController) {
    storage.get('userLoggedInFlag').then((loggedIn) => {
      // Globals.globals.userAccessToken = userAccessToken;
      // this.storage.get('user');
      console.log("userLoggedInFlag inside app component ",loggedIn)
      if (loggedIn) {
        this.rootPage = SideMenuPage ;
        
        
        
      } else {
        // this.rootPage = SideMenuPage ;
        this.rootPage = LoginPage;
      }
      
    });
    // return new Promise((resolve) => {
    //   this.getOnStorage().then((res) => {
    //     if (res) {
    //       this.deleteOnStorage().then(() => {

    //       });
    //     }
    //   }).then(() => {
    //     this.updateUserService(user);
    //     this.storage.set('user', JSON.stringify(user));
    //     resolve();
    //   });
    // });
 //   this.rootPage = HomePage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }
  // openCartPage() {
  //   // this.nav.setRoot(Cart);
  //   this.menuCtrl.toggle();
  // }

  // openTablesPage() {
  //   // this.navCtrl.push(DeviceDetailPage, item);
  //   this.nav.setRoot(MyListPage);
  //   this.menuCtrl.toggle();
  // }

  // openSofaPage() {
  //   // this.nav.setRoot(Productlisting, { category: 'Sofas' } );
  //   this.menuCtrl.toggle();
  // }

  // openChairPage() {
  //   // this.nav.setRoot(Productlisting, { category: 'Chairs' } );
  //   this.menuCtrl.toggle();
  // }

  // openCupboardPage() {
  //   // this.nav.setRoot(Productlisting, { category: 'Cupboards' } );
  //   this.menuCtrl.toggle();
  // }

  // openAccountPage() {
  //   // this.nav.setRoot(Myaccount);
  //   this.menuCtrl.toggle();
  // }

  // openStorePage() {
  //   // this.nav.setRoot(Storelocator);
  //   this.menuCtrl.toggle();
  // }

  // openOrdersPage() {
  //   // this.nav.setRoot(Orders);
  //   this.menuCtrl.toggle();
  // }

  // Logout() {
  //   // Globals.globals.userAccessToken = '';
  //   // this.storage.remove('userAccessToken');
  //   // Globals.globals.loggedInUser = false;
  //   this.storage.set('userLoggedInFlag', false);
  //   this.nav.setRoot(LoginPage);
  //   this.menuCtrl.toggle();
  // }
}

