import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReturnDeviceDetailPage } from './return-device-detail';

@NgModule({
  declarations: [
    ReturnDeviceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReturnDeviceDetailPage),
  ],
})
export class ReturnDeviceDetailPageModule {}
