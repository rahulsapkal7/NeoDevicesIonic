import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiData } from '../../services/api';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { SideMenuPage } from '../side-menu/side-menu';

/**
 * Generated class for the IssueDevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-issue-device',
  templateUrl: 'issue-device.html',
  providers: [ ApiData ]
})
export class IssueDevicePage {
  validEmail:any;
  issueDeviceData : any;
  loading:any;
  issue_device: FormGroup;
  usersInformation:any;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private apiService: ApiData, public loadingCtrl: LoadingController, public navParams: NavParams, private storage: Storage,) {
    storage.get('userDetails').then((userDetailsData) => {
      // Globals.globals.userAccessToken = userAccessToken;
      // this.storage.get('user');
      console.log("loggedData is ",userDetailsData);
      this.usersInformation = userDetailsData.data;
    });
    if ( typeof this.navParams.data == 'object' ) {
      this.issueDeviceData = this.navParams.data;
      console.log("this.navParams.data", this.issueDeviceData);
     
    }
    
    
  }
  ngOnInit() {
    
    this.validEmail =false;
        this.issue_device = new FormGroup({
          TLemail: new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern('.+(@neosofttech\.com|@wwindia\.com)$'),

          ])),
     });
      
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
  confirmAlert(Tl_mail) {
    let alert = this.alertCtrl.create({
      title: "Confirmation ",
      subTitle: "Are you sure you want to issue Device.",
      buttons: [
       {
         text: 'Yes',
         cssClass: 'method-color',
         handler: () => {
           console.log('Yes clicked');
           this.issueDevicesApiCall(Tl_mail);
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

      presentAlert(msg) {
        
       // this.alert.present();
         let alert = this.alertCtrl.create({
           title: "Alert",
           subTitle: msg,
           buttons: [
             {
               text: 'Ok',
               role: 'cancel',
               cssClass: 'alertCancel',
               handler: () => {
                 if (msg != "You can not enter your Email Id.") {
                  this.navCtrl.push(SideMenuPage);
                 }
                
               }
           }
           ]
         });
         alert.present();
       }
      
      onSubmit(issue_device): void {
        console.log("on click submit method ",issue_device);
        console.log("on click submit method ",this.issue_device.valid);
        if (this.issue_device.valid) {
          if (issue_device.value.TLemail == this.usersInformation.email) {
            // this.validEmail = true;
            this.presentAlert("You can not enter your Email Id.");
          } else {
            this.validEmail = false;
            console.log("Data is  ",this.issue_device.valid);
            console.log("this.navParams.data", this.issueDeviceData);
            console.log("this.sliderImages.data", this.usersInformation);
            this.confirmAlert(issue_device.value.TLemail) ;
          }
         
        } else {
          this.validEmail = true;
        console.log("on click submit method ",this.issue_device.valid);
       
        }
      
  
    }
    issueDevicesApiCall (TLemail){
      this.loader();
      var requestdata = {
        "empId" : this.usersInformation.id,
       "deviceId": this.issueDeviceData.id,
       "TLemail" : TLemail,
       "issueDeviceFlag" : true
     }
     this.apiService.postRequestWithToken("api/issueDevices" , requestdata).then((response) => {
       console.log("Success respo is ",response);  
         this.loading.dismiss();
         this.presentAlert("Your device issue request is initated. please contact admin department to borrow device.");
         
        
     }, error => {
       this.loading.dismiss();
       console.log("Error is ",JSON.parse(error._body).error.message);
       var msg = JSON.parse(error._body).error.message;
       
     });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueDevicePage');
  }

}
