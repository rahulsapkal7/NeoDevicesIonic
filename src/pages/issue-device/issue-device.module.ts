import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssueDevicePage } from './issue-device';

@NgModule({
  declarations: [
    IssueDevicePage,
  ],
  imports: [
    IonicPageModule.forChild(IssueDevicePage),
  ],
})
export class IssueDevicePageModule {}
