import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import { SideMenuPage } from '../side-menu/side-menu';
import { ApiData } from '../../services/api';
import { DisableSideMenu } from '../../app/custom-decorators/disable-side-menu.decorator';
import {AlertController, Events, Platform} from "ionic-angular";
@DisableSideMenu()


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ ApiData ]
})
export class LoginPage {


  public status: boolean = false;
  categories = [];         
   
    selectedCategory = this.categories[0]; 
  user: FormGroup;
  loading:any;
  constructor(
    public storage: Storage,
    private apiService: ApiData,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl : NavController) {
      
    }
  ngOnInit() {

      this.user = new FormGroup({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('.+(@neosofttech\.com|@wwindia\.com)$')
        ])),
          // email: new FormControl('', [Validators.required, Validators.pattern('[\w]*@neosofttech\.com($)|@wwindia\.com($)')]),
          // email: ['', Validators.compose([ Validators.pattern('[\w]*@neosofttech\.com($)|@wwindia\.com($)'),Validators.required])],
          // lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          // email: ['', Validators.compose([Validators.required, Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+$")])],
          password: new FormControl('', [Validators.required, Validators.minLength(7)]),
          branch : new FormControl('',[Validators.required]),
          city : new FormControl('',[Validators.required])
          
      });

  }
 
  presentAlert(alertData) {
   
  // this.alert.present();
    let alert = this.alertCtrl.create({
      title: alertData.title,
      subTitle: alertData.message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'alertCancel',
          handler: () => {
              // if (id != '' || id != undefined){
                // this.navCtrl.push(HomePage);
              // } else{
              //     this.alert =null;
              // }
          }
      }
      ]
    });
    alert.present();
  }

  onSubmit(user): void {
      console.log("on click submit method ",user);
      // this.presentAlert("pass");
      this.loader();
      var requestdata = {
        // "email": "rahul123@wwindia.com",
        // "password":"rahuls123"
        "email": user.value.email,
        "password":user.value.password,
      }
  
      this.apiService.postRequest("api/emps/login", requestdata).then((response) => {
        console.log("Success respo is ",response);  
          this.storage.set('userLoggedInFlag', true);
          this.storage.set('userLoggedData', response);
          this.loading.dismiss();
          this.navCtrl.setRoot(SideMenuPage);
          // this.navCtrl.push(SideMenuPage);
          // var alertData = {title : "Error",message:msg}
          // this.presentAlert(alertData);
          this.getEmpData(response);
          // this.navCtrl.push(RegisterPage);
      }, error => {
        console.log("Error is ",error);
        // var msg = JSON.parse(error._body).error.message;
        var alertData = {title : "Error",message:"Invalid credential"}
        this.presentAlert(alertData);
         this.loading.dismiss();
      });

  }
  getEmpData (userLoggedData){
    userLoggedData = userLoggedData.data;
    console.log("userLoggedData",userLoggedData);
   
    var URL = 'api/emps/'+userLoggedData.userId+"?access_token="+userLoggedData.id ;
    
    
    this.apiService.getData(URL).then((response) => {
      console.log("Success respo is ",response); 
      this.storage.set('userDetails', response);
    }, error => {
      //  this.toastMessage('Could not get your Cart Details. Please try again.', 3000);
       this.loading.dismiss();
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
  register() {
    console.log("on click register method");
    
    this.navCtrl.push(RegisterPage);
  }

}
