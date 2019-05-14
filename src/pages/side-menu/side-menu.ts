import { Component, ViewChild } from '@angular/core';
import { IonicPage,Nav, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {MyListPage} from "../my-list/my-list";
import { DeviceListPage } from '../device-list/device-list';


import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-side-menu',
  templateUrl: 'side-menu.html',
})
export class SideMenuPage {
  @ViewChild(Nav) nav: Nav;
rootPage:any = HomePage;

  sideMenuList = [];
  usersInformation1:any;
  fname : "user";
  email : "user@gmail.com";
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    

this.sideMenuList = [
{name:"Home",icon:"home"},
{name:"My List",icon:"bookmarks"},
{name:"Logout",icon:"log-out"}];
// storage.get('userDetails').then((userDetailsData) => {
  
//   console.log("loggedData is ",userDetailsData);
//   console.log("userDetailsData.data.fname is",userDetailsData.data.fname);
//   this.fname = userDetailsData.data.fname;
//   this.email = userDetailsData.data.email;
  
// });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SideMenuPage');   
  }
  goToMyList (event){
    console.log("inside goToMyList",JSON.stringify(event));
    this.navCtrl.push(MyListPage);
  }
  logout (event){
    console.log("inside logout",JSON.stringify(event));
    this.storage.set('userLoggedInFlag', false);
    this.nav.setRoot(LoginPage);
  }
  sliderClick(event,data){
    console.log("event  : "+JSON.stringify(data));
    switch(data.name){
      case "My List":
      // this.nav.setRoot(MyListPage);
      this.navCtrl.push(MyListPage);
      break;
      case "Home":
      // this.navCtrl.push(HomePage);
      break;
      case "Logout":
      this.storage.remove('userLoggedInFlag');
      // this.storage.set('userLoggedInFlag', false);
      this.nav.setRoot(LoginPage);
      break;
      
    }
  }

}
