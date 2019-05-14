import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiData } from '../../services/api';
import * as _ from 'underscore';
import { IssueDevicePage } from '../issue-device/issue-device';
import * as Enums from '../../enums/enums';
/**
 * Generated class for the DeviceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-detail',
  templateUrl: 'device-detail.html',
  providers:[ApiData]
})
export class DeviceDetailPage {
  deviceDetails:any; 
  ImgURL = Enums.APIURL.ImgURL;
  sliderImages:any = ["http://10.0.80.51:8087/server/files/image/Motorola%20Moto%20G%20(Black).jpeg","http://10.0.80.51:8087/server/files/image/Asus_Nexus.jpeg","http://10.0.80.51:8087/server/files/image/Samsung%20I9300%20Galaxy%20S%20III.jpeg"];
  deviceTable : any = [];
  constructor(public navCtrl: NavController,private storage: Storage,private apiService:ApiData, public navParams: NavParams) {
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
      this.getEmpData(loggedData.data);
    });
  }
  
  issueDevice() {
  console.log("navigate to issue device",this.deviceDetails)
  this.navCtrl.push(IssueDevicePage, this.deviceDetails);
     
   
  }


  getEmpData (userLoggedData){
    
    console.log("userLoggedData",userLoggedData);
   
    var URL = 'api/emps/'+userLoggedData.userId+"?access_token="+userLoggedData.id ;
    
    
    this.apiService.getData(URL).then((response) => {
      console.log("Success respo is ",response); 
      
    }, error => {
      //  this.toastMessage('Could not get your Cart Details. Please try again.', 3000);
      //  this.loading.dismiss();
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceDetailPage');
    
  }

}
