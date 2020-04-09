import { Component } from '@angular/core';

import {NavController} from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx'; 	
import { Platform } from '@ionic/angular';  


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private iab: InAppBrowser,
    public navCtrl:NavController,
    private admob: AdMobFree,
     private platform: Platform
  ) {}

  openLink(uri: string) {
    this.iab.create(uri, "_system");
  }

  gokiyaku(){
    this.navCtrl.navigateForward('/kiyakupage');
  }

  userInfo(){
    this.navCtrl.navigateForward('/user');
  }

  // ionViewWillEnter (){
  //   this.showBanner();
  // } 

  // showBanner(){
  //   let id;
  //   if(this.platform.is("ios")){
  //     id = "ca-app-pub-3940256099942544/6300978111";
  //     // id = "ca-app-pub-5818565020690703/9877789949";
  //   }else{
  //     id = "ca-app-pub-5818565020690703/2607133573";
  //   }
  //   const bannerConfig:AdMobFreeBannerConfig = {
  //     id:id,
  //     isTesting:true,
  //     autoShow:true,
  //     size:'SMART_BANNER'
  //   };
  //   this.admob.banner.config(bannerConfig);
  //   this.admob.banner.prepare()
  //   .then(() => {
  //     // banner Ad is ready
  //     // if we set autoShow to false, then we will need to call the show method here
  //   })
  //   .catch(e => console.log('Error Admob', e));
  // }  


}
