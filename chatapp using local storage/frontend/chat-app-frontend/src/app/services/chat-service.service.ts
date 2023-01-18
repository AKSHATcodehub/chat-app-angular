

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io } from "socket.io-client";
import { UserDataService } from './user-data.service';


@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public messageSent: BehaviorSubject<string> = new BehaviorSubject('');
  public groupMessage: BehaviorSubject<string> = new BehaviorSubject('');
  public groupMessageSent: BehaviorSubject<string> = new BehaviorSubject('');
  public groupCreate: BehaviorSubject<string> = new BehaviorSubject('');

  public subject:Subject<any> = new Subject()
 


  socket = io('http://localhost:3000');

  constructor(private userData:UserDataService) {
    this.socket.on("array",(activeUsers:any)=>{
      console.log("active user...",activeUsers);
      // for(let i=0; i<activeUsers.length;i++){
      //   activeUsers
      // }
      
    })
  }

  connectedUserID:any;
  
  getSocketID(){

    return this.socket;
      
  }

  public sendMessage(message?:any,room?:any) {
    this.socket.emit('message', message,room,(message:any)=>{
      this.message$.next(message);
    });
    return this.message$.asObservable()
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };

  public sendMessageToGroup(message?:any,room?:any){
    this.socket.emit("group-chat",message,room,(message:any)=>{
      this.groupMessageSent.next(message)
    })

    return this.groupMessageSent.asObservable();
  }

  public getMessageFromGroup(){

    this.socket.on('group-chat', (message) =>{
      this.groupMessage.next(message);
    });
    
    return this.groupMessage.asObservable();

  }

  getStorage() {
    const storage: any = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data:any) {
    localStorage.setItem('chats', JSON.stringify(data));
  }

  getGroupName(){
    this.socket.on("group create",(message)=>{
      this.groupCreate.next(message)
    })
    return this.groupCreate.asObservable();

  }

  sendGroupName(groupName:any){
    this.socket.emit('group create',groupName,(groupName:any)=>{
      this.groupMessage.next(groupName)
    })
    return this.groupMessage.asObservable();
  }
}


