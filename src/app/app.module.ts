import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { DeviceListPage } from '../pages/device-list/device-list';
import { DeviceDetailPage } from '../pages/device-detail/device-detail';
import { IssueDevicePage } from '../pages/issue-device/issue-device';
import { MyListPage } from '../pages/my-list/my-list';
import { ReturnDeviceDetailPage } from '../pages/return-device-detail/return-device-detail';

import { SideMenuPage } from '../pages/side-menu/side-menu';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SideMenuPage,
    RegisterPage,
    HomePage,
    DeviceListPage,
    DeviceDetailPage,
    IssueDevicePage,
    ReturnDeviceDetailPage,
    MyListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      
      tabsHideOnSubPages: true,
      
      }),
   
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SideMenuPage,
    RegisterPage,
    HomePage,
    DeviceListPage,
    DeviceDetailPage,
    IssueDevicePage,
    ReturnDeviceDetailPage,
    MyListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  
      static injector: Injector;
  
      constructor(injector: Injector) {    
          // Make the injector to be available in the entire module
          AppModule.injector = injector;    
      }
  }
