import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ApiData } from '../../services/api';
import { LoginPage } from '../login/login';
import { DisableSideMenu } from '../../app/custom-decorators/disable-side-menu.decorator';
import {AlertController, Events, Platform} from "ionic-angular";
@DisableSideMenu() 
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [ ApiData ]
})
export class RegisterPage {
  loading:any;
  register_user: FormGroup;
  categories = [];         
  public status: boolean = false;
  
  passwordMatch: any = false;
  constructor(
    public storage: Storage,
    private apiService: ApiData,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController) {
    
    
}
  ngOnInit() {

  this.register_user = new FormGroup({
  fname: new FormControl('', [Validators.required, Validators.minLength(4)]),
  lname: new FormControl('', [Validators.required, Validators.minLength(4)]),
  // name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  confirm_password: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.minLength(4)]),
  password: new FormControl('', [Validators.required, Validators.minLength(7)]),
  branch : new FormControl('',[Validators.required]),
  city : new FormControl('',[Validators.required]),
  mob: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)])
  });
  
  }

  checkConfirmPassword(form: NgForm) {

    if ( form.value.password !== form.value.confirm_password ) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

  presentAlert(alertData) {
     let alert = this.alertCtrl.create({
       title: alertData.title,
       subTitle: alertData.message,
       buttons: [
         {
           text: 'Ok',
           role: 'cancel',
           cssClass: 'alertCancel',
           handler: () => {
               if (alertData.title ==  'Success' ){
                this.navCtrl.push(LoginPage);
               } 
           }
       }
       ]
     });
     alert.present();
   }

  onChangeCity(user){
    console.log("chnage triggered ",user);
    this.status = true;
    switch (user.value.city) {
      case "Mumbai":
      this.categories = [
        {
          title: 'Dadar(Ruby Office)',
          value: 1 
        },
        {
          title: 'Prabhadevi(Bussiness Tower 8Th Floor)',
          value: 2
        },
        {
          title: 'Prabhadevi(Bussiness Tower 9Th Floor)',
          value: 3
        },
        {
          title: 'Prabhadevi(Bussiness Tower 10Th Floor)',
          value: 4
        },
        {
          title: 'Prabhadevi(Unique Office)',
          value: 5
        }];
        break;
    
        case "NaviMumbai":
        this.categories = [
          {
            title: 'Rabale(Sigma IT Park 5th floor)',
            value: 1 
          },
          {
            title: 'Rabale(Sigma IT Park 9th floor)',
            value: 2
          },
          ];
          break;

          case "Pune":
          this.categories = [
            {
              title: 'Pune(Ruby Office)',
              value: 1 
            },
           ];
            break;
      default:
        break;

        
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

onSubmit(user): void {

 console.log("on click submit method ",user);
 
 this.loader();
 var requestdata = {
   "fname": user.value.fname,
   "lname": user.value.lname,
   "email": user.value.email,
   "password":user.value.password,
   "city":user.value.city,
   "branch":user.value.branch,
   "mob": user.value.mob
  //  "role":"user"
 }

 this.apiService.postRequest("api/emps", requestdata).then((response) => {
   console.log("Success respo is ",response);  
//  if ( response.data.status === 200 ) {
     console.log("Success respo is ");
    //  this.storage.set('userLoggedInFlag', true);
     this.loading.dismiss();
     var alertData = {title : "Success",message:"Thanks for registration. We send you verification link on your email id."}
     this.presentAlert(alertData);
     // Globals.globals.userAccessToken = response.data.access_token;
    //  this.navCtrl.push(LoginPage);
     // this.storage.set('userAccessToken', Globals.globals.userAccessToken );
     // this.events.publish('updateSidebar');
  //  }
 }, error => {
  console.log("Error is ",JSON.parse(error._body).error.message);
  var err = JSON.parse(error._body).error;
  var msg = "";
  if (err.statusCode == 422) {
     msg = "Email already exist.";
  } else {
     msg = JSON.parse(error._body).error.message;
  }
  // var msg = JSON.parse(error._body).error.message;
    var alertData = {title : "Error",message:msg}
          this.presentAlert(alertData);
   //  this.toastMessage('Email or Password is wrong. Please try again.', 3000);
    this.loading.dismiss();
 });
 // Or to get a key/value pair

 // this.navCtrl.setRoot(LoginPage);
}
  

}
