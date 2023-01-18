import { Component } from '@angular/core';
import { ChatServiceService } from './services/chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-app-frontend';
  newMessage!: string;
  messageList: string[] = [];
  k:any;
  roomId:any="llllllllllll";


  ngOnInit(){
    
  //   this.chatService.getNewMessage().subscribe((message: string) => {
  //     this.messageList.push(message);
  //   })
  // }

  // sendMessage() {
  //   this.chatService.sendMessage(this.newMessage);
  //   this.newMessage = '';
  // const name="askhay"
  // console.log("slice",name.slice(0,3),name.slice(0,4))
  // let a="ask"
  // let b="aks"
  // console.log("CHECK",a===b);
  console.log("this is xxx",);
  
  }
  sendMessage(){
    console.log("sendmesa",this.roomId);
    

  }

  sendMessageToRoom(){
    console.log("snedmsg to group",this.roomId);
    
  }
  

  // fun1(){
  //   const x = 5
  //   console.log("5==",x);
    
  // }

  // fun2(){
  //   const x = 6
  //   console.log("6==",x);
    
  // }

  
}


