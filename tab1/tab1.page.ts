import { Component , ViewChild} from '@angular/core';

import { NavController, IonContent } from '@ionic/angular';

import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx'; 	
import { Platform } from '@ionic/angular';  

import * as firebase from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    public navCtrl:NavController,private admob: AdMobFree, private platform: Platform  ) {  
  }

  async ngOnInit() {    
    firebase.auth().signInAnonymously().catch(function(error) {
      console.log("error")
    });
    // 認証状態が変化すると呼び出される
    firebase.auth().onAuthStateChanged( (user) => {
      if ( user ) {
        let uid = user.uid;
      }
    });  
  }

  ionViewWillEnter (){
    this.showBanner();
  } 

  showBanner(){
    let id;
    if(this.platform.is("ios")){
      id = "ca-app-pub-3940256099942544/6300978111";//test
    }else{
      id = "ca-app-pub-5818565020690703/2607133573";
    }
    const bannerConfig:AdMobFreeBannerConfig = {
      id:id,
      isTesting:true,
      autoShow:true,
      size:'SMART_BANNER'
    };
    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare()
    .then(() => {
    })
    .catch(e => console.log('Error Admob', e));
  }  

  async showInter(){
    if(this.admob.interstitial.isReady()){
      this.admob.interstitial.show();
    }
  } 

  chatStart() {
    var database = firebase.database();
    var room_num;
    var room_numVal;
    var user;
    var status;
    var dataNum = database.ref('room_num');
    var this_pass = this;
    
    dataNum.once("value", function(snapshot) {
      room_numVal = snapshot.child("count").val();      
      room_num = snapshot.val();

      if(room_num['count'] === 0){
        room_num['count']++;
        dataNum.update( {
          'count': room_num['count']
        } );
        database.ref(`chatrooms/room${room_num['count']}`).set({
          first_comment:'hello '+`room${room_num['count']}`,
          user:1,
          status:'open'
        });  
        this_pass.navCtrl.navigateForward('chat/' + `room${room_num['count']}`);

      }else{
        database.ref(`chatrooms/room${room_num['count']}`).once("value", function(snapshot) {
          user = snapshot.child("user").val();
          status = snapshot.child("status").val();
          if(user === 1){
            if(status === 'open'){
              database.ref(`chatrooms/room${room_num['count']}`).update( {
                user: 2,
                status: 'close'
              } );
              this_pass.navCtrl.navigateForward('chat/' + `room${room_num['count']}`);
            }else{
              room_num['count']++;
              dataNum.update( {
                'count': room_num['count']
              } );
              database.ref(`chatrooms/room${room_num['count']}`).set({
                first_comment:'hello '+`room${room_num['count']}`,
                user:1,
                status:'open'

              });
              this_pass.navCtrl.navigateForward('chat/' + `room${room_num['count']}`);
            }
          }else{
            if(status === 'open'){
              room_num['count']++;
              dataNum.update( {
                'count': room_num['count']
              } );

              database.ref(`chatrooms/room${room_num['count']}`).set({
                first_comment:'hello '+`room${room_num['count']}`,
                user:1,
                status:'open'

              });
              this_pass.navCtrl.navigateForward('chat/' + `room${room_num['count']}`);
            }else{
              room_num['count']++;
              dataNum.update( {
                'count': room_num['count']
              } );

              database.ref(`chatrooms/room${room_num['count']}`).set({
                first_comment:'hello '+`room${room_num['count']}`,
                user:1,
                status:'open'

              });
              this_pass.navCtrl.navigateForward('chat/' + `room${room_num['count']}`);
            }
          }
        });
      }      
    });

  }

}

export const snapshotToArray = snapshot => {
  
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

