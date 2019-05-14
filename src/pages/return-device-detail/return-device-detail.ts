import { Component } from '@angular/core';
import { IonicPage,LoadingController, NavController, NavParams,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiData } from '../../services/api';
import * as _ from 'underscore';
import { IssueDevicePage } from '../issue-device/issue-device';
import * as Enums from '../../enums/enums';
import { SideMenuPage } from '../side-menu/side-menu';

/**
 * Generated class for the DeviceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-return-device-detail',
  templateUrl: 'return-device-detail.html',
  providers:[ApiData]
})
export class ReturnDeviceDetailPage {
  deviceDetails:any; 
  userData : any;
  ImgURL = Enums.APIURL.ImgURL;
  sliderImages:any = ["http://10.0.80.51:8087/server/files/image/Motorola%20Moto%20G%20(Black).jpeg","http://10.0.80.51:8087/server/files/image/Asus_Nexus.jpeg","http://10.0.80.51:8087/server/files/image/Samsung%20I9300%20Galaxy%20S%20III.jpeg"];
  deviceTable : any = [];
  loading:any;
  constructor(public navCtrl: NavController,private storage: Storage, public loadingCtrl: LoadingController, private apiService:ApiData,private alertCtrl: AlertController, public navParams: NavParams) {
    if ( typeof this.navParams.data == 'object' ) {
      this.deviceDetails = this.navParams.data;
      // _.forEach( this.deviceDetails.images, (imageUrl) => {
      // 	this.sliderImages.push(imageUrl.ImgURL);
      // });

      
      console.log("this.navParams.data", this.deviceDetails);
      console.log("this.sliderImages.data", this.sliderImages);
      this.sliderImages = this.navParams.data.images;
      console.log("this.sliderImages.data after update", this.sliderImages);
    }
    
    storage.get('userLoggedData').then((loggedData) => {
      // Globals.globals.userAccessToken = userAccessToken;
      // this.storage.get('user');
      console.log("loggedData is ",loggedData);
      this.userData= loggedData.data
      // this.getEmpData(loggedData.data);
    });
  }
  
  returnDevice() {
  console.log("navigate to issue device",this.deviceDetails)
  // this.navCtrl.push(IssueDevicePage, this.deviceDetails);
     this.confirmAlert();
   
  }
  loader() {
    this.loading = this.loadingCtrl.create({
      content: '',
      spinner: 'bubbles',
      cssClass: 'loader'
    });
    this.loading.present();
  }
  // Confirmation alert box 
  confirmAlert() {
     let alert = this.alertCtrl.create({
       title: "Confirmation ",
       subTitle: "Are you sure you want to return Device",
       buttons: [
        {
          text: 'Yes',
          cssClass: 'method-color',
          handler: () => {
            console.log('Yes clicked');
            this.returnDeviceApiCall();
          }
        },
         {
           text: 'No',
           role: 'cancel',
           cssClass: 'alertCancel',
           handler: () => {
            console.log('No clicked');
           }
       },
       ]
     });
     alert.present();
   }
   returnDeviceApiCall(){
     console.log("inside returnDeviceApiCall");
    //  /api/returnDevices
    this.loader();
    var requestdata = {
      "empId" : this.userData.userId,
     "deviceId": this.deviceDetails.id,
     "TLemail" : this.deviceDetails.TLemail,
     "issueDeviceFlag" : true
   }



   this.apiService.postRequestWithToken("api/returnDevices" , requestdata).then((response) => {
     console.log("Success respo is ",response);  
       this.loading.dismiss();
       this.presentAlert();
      
      
   }, error => {
     this.loading.dismiss();
    //  console.log("Error is ",JSON.parse(error._body).error.message);
    //  var msg = JSON.parse(error._body).error.message;
     // var alertData = {title : "Error",message:msg}
     // this.presentAlert(alertData);
     
   });

   }
   presentAlert() {
    
   // this.alert.present();
     let alert = this.alertCtrl.create({
       title: "Alert",
       subTitle: "Device is return successfully",
       buttons: [
         {
           text: 'Ok',
           role: 'cancel',
           cssClass: 'alertCancel',
           handler: () => {
            this.navCtrl.setRoot(SideMenuPage);
           }
       }
       ]
     });
     alert.present();
   }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceDetailPage');
    
  }

}
