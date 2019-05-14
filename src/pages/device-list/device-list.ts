import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import {App, Nav, Platform } from 'ionic-angular';
import { ApiData } from '../../services/api';
import { IssueDevicePage } from '../issue-device/issue-device';
import { DeviceDetailPage } from '../device-detail/device-detail';

import * as Enums from '../../enums/enums';
/**
 * Generated class for the DeviceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-list',
  templateUrl: 'device-list.html',
  providers: [ ApiData ]
})
export class DeviceListPage {
  @ViewChild(Nav) nav: Nav;
  loading:any;
  deviceList:any = [];
  ImgURL = Enums.APIURL.ImgURL;
  
  platformType:any = 1;
  rootPage:any;
  constructor(public navCtrl: NavController,  public loadingCtrl: LoadingController, private apiService: ApiData, public navParams: NavParams) {
    console.log('inside constructor AndroidPage',this.navParams.data);
    this.platformType = this.navParams.data;
    this.deviceList = [];
    
  }

  ionViewDidEnter() {
    this.getDeviceList();
 }

  // ionSelected() {
  //   console.log("Home Page has been selected",this.platformType);
  //   this.loader();
  //   if (this.platformType == "Android") {
  //     this.apiService.getData("api/categories/5c00c6cc86760804ad733a01/devices?filter[include]=images").subscribe((response) => {
  //       console.log("Success respo is ",response); 
  //       this.deviceList = response.data;
  //         console.log("Success respo is ");
  //         this.loading.dismiss();
  //     }, error => {
  //       console.log("Error is ",error);
  //        this.loading.dismiss(); 
  //     }); 
   
    
    
  //   } else if (this.platformType == "Ios") {
  //     this.apiService.getData("api/categories/5c00c6da86760804ad733a02/devices?filter[include]=images").subscribe((response) => {
  //       console.log("Success respo is ",response); 
  //       this.deviceList = response.data;
  //         console.log("Success respo is ");
  //         this.loading.dismiss();
  //     }, error => {
  //       console.log("Error is ",error);
  //        this.loading.dismiss(); 
  //     }); 
   
  //   }
  //   else  {
  //     this.apiService.getData("api/categories/5c00c6e686760804ad733a03/devices?filter[include]=images").subscribe((response) => {
  //       console.log("Success respo is ",response); 
  //       this.deviceList = response.data;
  //         console.log("Success respo is ");
  //         this.loading.dismiss();
  //     }, error => {
  //       console.log("Error is ",error);
  //        this.loading.dismiss(); 
  //     }); 
   
  //   }
  //   // do your stuff here
  // }
  getDeviceList (){
    this.loader();
    if (this.platformType == "Android") {
      this.apiService.getData("api/categories/5c00c6cc86760804ad733a01/devices?filter[include]=images").then((response) => {
        console.log("Success respo is ",response); 
        
        this.deviceList = response;
        
          console.log("Success respo is ",this.deviceList);
          this.loading.dismiss();
      }, error => {
        console.log("Error is ",error);
         this.loading.dismiss(); 
      }); 
   
    
    
    } else if (this.platformType == "Ios") {
      this.apiService.getData("api/categories/5c00c6da86760804ad733a02/devices?filter[include]=images").then((response) => {
        console.log("Success respo is ",response); 
        this.deviceList = response;
       
          console.log("Success respo is ");
          this.loading.dismiss();
      }, error => {
        console.log("Error is ",error);
         this.loading.dismiss(); 
      }); 
   
    }
    else  {
      this.apiService.getData("api/categories/5c00c6e686760804ad733a03/devices?filter[include]=images").then((response) => {
        console.log("Success respo is ",response); 
        this.deviceList = response;
        
          console.log("Success respo is ");
          this.loading.dismiss();
      }, error => {
        console.log("Error is ",error);
         this.loading.dismiss(); 
      }); 
   
    }
  }
 
  loader() {
    this.loading = this.loadingCtrl.create({
      content: '',
      spinner: 'bubbles',
      cssClass: 'loader'
    });
    this.loading.present();
  }
  IssueDevice(item) {
    this.navCtrl.push(DeviceDetailPage, item);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AndroidPage',this.navParams.data);
  }

}


