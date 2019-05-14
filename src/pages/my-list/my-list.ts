import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {App, Nav, Platform } from 'ionic-angular';
import { ApiData } from '../../services/api';
import * as Enums from '../../enums/enums';
import { Storage } from '@ionic/storage';
import { ReturnDeviceDetailPage } from '../return-device-detail/return-device-detail';


/**
 * Generated class for the MyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-list',
  templateUrl: 'my-list.html',
  providers: [ ApiData ]
  
})
export class MyListPage {
  @ViewChild(Nav) nav: Nav;
  loading:any;
  deviceList:any = [];
  usersInformation:any;
  
  ImgURL = Enums.APIURL.ImgURL;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private apiService: ApiData, public navParams: NavParams,private storage: Storage) {
    storage.get('userDetails').then((userDetailsData) => {
      // Globals.globals.userAccessToken = userAccessToken;
      // this.storage.get('user');
      console.log("loggedData is ",userDetailsData);
      this.usersInformation = userDetailsData.data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyListPage');
  }
  ReturnDevice(item){
      this.navCtrl.push(ReturnDeviceDetailPage,item );
    
  }
  ionViewDidEnter() {
    this.getMyIssuedDeviceList();
 }
 loader() {
  this.loading = this.loadingCtrl.create({
    content: '',
    spinner: 'bubbles',
    cssClass: 'loader'
  });
  this.loading.present();
}
 getMyIssuedDeviceList (){
  this.loader();
  var requestdata = {
    "empId" : this.usersInformation.id,
   "issueDeviceFlag" : true
 }

 this.apiService.postRequestWithToken("api/issueDevices/getMyIssuedDevices" , requestdata).then((response) => {
   console.log("Success respo is ",response);  
   this.deviceList = response;
     this.loading.dismiss();
   
    
 }, error => {
   this.loading.dismiss();
   console.log("Error is ",error);
   this.deviceList = null;
  //  console.log("Error is ",JSON.parse(error._body).error.message);
  //  var msg = JSON.parse(error._body).error.message;
  
   
 });

 
 
  
}
}
