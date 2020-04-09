import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonContent } from '@ionic/angular';
import * as firebase from 'Firebase';

import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx'; 	
import { Platform } from '@ionic/angular';  


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  
  data = { type:'', user:'', message:'' };

  roomkey: string;
  uid: string;
  chatMessage: string;
  
  chats = [];
  offStatus = false;
  
  @ViewChild(IonContent, {static: false}) content: IonContent;  

  constructor(
    public navCtrl: NavController, 
    public route: ActivatedRoute ,
    private admob: AdMobFree, 
    private platform: Platform
  ) {
    this.roomkey = this.route.snapshot.paramMap.get('key') as string;
    firebase.auth().onAuthStateChanged( (user) => {
      if ( user ) {
        this.uid = user.uid;

        this.sendJoinMessage();
      }
    });  

    this.displayChatMessage();

    this.platform.ready().then(() => {
      document.addEventListener("backbutton", () => {
        var roomKey = firebase.database().ref('chatrooms/' + this.roomkey);
        var user;
        var status;
        this.sendExitMessage();
        roomKey.once("value", function(snapshot) {
          user = snapshot.child("user").val()
          status = snapshot.child("status").val();
          user--;
          if(status === 'open'){
            if(user === 1){
              roomKey.update( {
                user: user,
                status: 'close'
              } );      
            }else{
              roomKey.remove();
            }
          }else{
            if(user === 1){
              roomKey.update( {
                user: user,
                status: 'close'
              } );      
            }else{
              roomKey.remove();
            }
          }
        });    

        let id;
        if(this.platform.is("ios")){
          id = "ca-app-pub-3940256099942544/1033173712";//test
        }else{
          id = "ca-app-pub-5818565020690703/9771802561";
        }
        const interConfig:AdMobFreeInterstitialConfig = {
          id:id,
          isTesting:true,
          autoShow:true,
        };
        this.admob.interstitial.config(interConfig);
        this.admob.interstitial.prepare();
    
      });
    });
  
  }
  
  ngOnInit(): void {
  }
  
  sendJoinMessage() {
    this.sendMessage('join','チャットルームに入りました！');
  }

  sendExitMessage() {
    this.sendMessage('exit','相手がチャットをやめたよ！');
  }
  

  ScrollToBottom() { 
    var scope = this;
    scope.content.scrollToBottom(800); 
  } 
    
  displayChatMessage() {
    var database = firebase.database();
    database.ref('chatrooms/' + this.roomkey + '/chats')
      .on('value', resp => {
        if (resp) {
          this.chats = [];
          resp.forEach(childSnapshot => {
            const chat = childSnapshot.val();
            chat.key = childSnapshot.key;
            this.chats.push(chat);
          });
        }
      });
  }

  sendChatMessage() {
    if(this.chatMessage){
      this.sendMessage('message', this.chatMessage);
      this.chatMessage = "";
      var scope = this;
    }
        setTimeout(function() {
          scope.content.scrollToBottom(800); 
        },100);
  }

  sendMessage(type: string, message: string) {
    const newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: type,
      user: this.uid,
      message: message,
      sendDate: Date()
    });  
  }

  exitRoom(){
    var roomKey = firebase.database().ref('chatrooms/' + this.roomkey);
    var user;
    var status;
    this.sendExitMessage();
    roomKey.once("value", function(snapshot) {
      user = snapshot.child("user").val()
      status = snapshot.child("status").val();
      user--;
      if(status === 'open'){
        if(user === 1){
          roomKey.update( {
            user: user,
            status: 'close'
          } );      
        }else{
          roomKey.remove();
        }
      }else{
        if(user === 1){
          roomKey.update( {
            user: user,
            status: 'close'
          } );      
        }else{
          roomKey.remove();
        }
      }
    });

    let id;
    if(this.platform.is("ios")){
      id = "ca-app-pub-3940256099942544/1033173712";//test
    }else{
      id = "ca-app-pub-5818565020690703/9771802561";
    }
    const interConfig:AdMobFreeInterstitialConfig = {
      id:id,
      isTesting:true,
      autoShow:true,
    };
    this.admob.interstitial.config(interConfig);
    this.admob.interstitial.prepare();
  }

}