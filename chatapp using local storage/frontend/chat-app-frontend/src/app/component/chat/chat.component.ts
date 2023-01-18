import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { io } from 'socket.io-client';
import { UserDataService } from 'src/app/services/user-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    private chatService: ChatServiceService,
    public userData: UserDataService,
    public _snackbar:MatSnackBar
  ) {}
  isMessage:boolean=false
  newMessage: string='';
  messageList: string[] = [];
  socket: any;
  personId: any;
  activeUserArray: any[]=[];
  roomId: any;
  personName: String = this.userData.userList[0].name;
  phoneNo!: Number;
  commonRoomId: any;
  sendmessage: any;
  storageArray: any[] = [];
  messageArray: any[] = [];
  roomName: any;
  createdGroups:any[]=[]
  joinedMessage:any;
  content: string=this.newMessage;
  limit: number=10;
  completeWords: boolean=true;
  isContentToggled!: boolean;
  nonEditedContent!: string;
  showImage=true;
  readMore=false
  ngOnInit() {



    this.socket = this.chatService.getSocketID();
    let socket = this.chatService.getSocketID();

    
   
    this.nonEditedContent = this.content;
    this.content = this.formatContent(this.content);


    socket.on('connect', () => {
      socket.emit('ehlo', this.userData.userList[0].name);
      this.personId = socket.id;
      this.userData.userList[0].socketID = this.personId;
    });

    socket.on('array', (allUsersArray: any[]) => {
      console.log('array of socket', allUsersArray);
      this.activeUserArray = allUsersArray.filter((item) => {
        return this.personId != item.socketID;
      });
      
      
      console.log('active array', this.activeUserArray);

    });

    socket.on("group create",((message:any)=>{
      
      console.log("group mesage ....",message);
      this.activeUserArray = message.filter((item:any) => {
        return this.personId != item.socketID;
      })  
    }));


    // socket.on("group members",(userJoinedData:any)=>{
    //   this.joinedMessage=userJoinedData
    //   console.log("user joined data ....",userJoinedData);
      
    // })

    // this.userSelected()

   

    this.chatService.getMessageFromGroup().subscribe((message: any) => {

      this.messageList.push(message);
      console.log('this is grop cht mesg', message);

      this.storageArray = this.chatService.getStorage();
      console.log("this is getStorage..",this.storageArray);
      
      const storeIndex = this.storageArray.findIndex(
        (Storage) => {
          console.log(
            '-------------- .in ngoninit()',
            Storage.roomId == this.roomName,
            Storage.roomId,
            this.roomName
          );

          return Storage.roomId == this.roomName;
        }
        // console.log("this is slice 1",Storage.roomId.slice(20,40),this.roomId, Storage.roomId.slice(20,40)==this.roomId);
      );
      console.log('storeIndex', storeIndex);

      if (storeIndex > -1) {
        console.log("///////////////////////////////");
      this.storageArray = this.chatService.getStorage();
        
      
        this.messageArray = this.storageArray[storeIndex].chats;
        console.log("mesage array in group message.......",this.messageArray);
     
        
      }
      
    });

    

    this.chatService.getNewMessage().subscribe((message: string) => {
      console.log('message...', message);

      this.messageList.push(message);
      console.log("this is messageList array...",this.messageArray);
      
      this.storageArray = this.chatService.getStorage();
      const storeIndex = this.storageArray.findIndex(
        (Storage) => {
          console.log('this is userselected called...........in ngoninit()');

          return (
            (Storage.roomId?.slice(0, 20) == this.roomId ||
              Storage.roomId?.slice(20, 40) == this.roomId) &&
            (Storage.roomId?.slice(0, 20) ==
              this.userData.userList[0].socketID ||
              Storage.roomId?.slice(20, 40) ==
                this.userData.userList[0].socketID)
          );
        }
        // console.log("this is slice 1",Storage.roomId.slice(20,40),this.roomId, Storage.roomId.slice(20,40)==this.roomId);
      );
      console.log('storeIndex', storeIndex);

      if (storeIndex > -1) {
        this.messageArray = this.storageArray[storeIndex].chats;
        console.log(
          'message array get filled in user selected function..........'
        );
      }else {
        console.log("before local storage....");
        
        let updatedStorage = {
          roomId: this.commonRoomId,
          chats: [
            {
              user: this.personName,
              message: this.newMessage,
            },
          ],
        };
        this.storageArray.push(updatedStorage);
        console.log("after local storage....",this.storageArray);

        // this.messageArray = [updatedStorage];
        // this.messageArray=this.storageArray[0].chats
      }
    });
  }

  toggleContent() {
    this.isContentToggled = !this.isContentToggled;
    this.content = this.isContentToggled
      ? this.nonEditedContent
      : this.formatContent(this.content);
  }

  formatContent(content: string) {
    if (this.completeWords) {
      this.limit = content.substr(0, this.limit).lastIndexOf(' ');
    }
    return `${content.substr(0, this.limit)}...`;
  }

  sendMessage() {
    // alert('1111111111');
    console.log("mesage length",this.newMessage.length);
    

    if(this.newMessage?.trim().length!=0 && this.selectedUserName){
      this.content= this.newMessage
      console.log("this is content.....",this.content);
      
      this.nonEditedContent = this.content;
      this.content = this.formatContent(this.content);
  
      this.roomName=null
      console.log('send message called ....');
      this.sendmessage = this.newMessage;
      this.chatService.sendMessage(this.newMessage, this.roomId);
  
      this.storageArray = this.chatService.getStorage();
      const storeIndex = this.storageArray.findIndex((Storage: any) => {
        // console.log("this is slice 2",Storage.roomId.slice(20,40),this.roomId,Storage.roomId.slice(20,40) == this.roomId  );
  
        return (
          ((Storage.roomId?.slice(0, 20) == this.roomId ||
            Storage.roomId?.slice(20, 40) == this.roomId) &&
            (Storage.roomId?.slice(0, 20) == this.userData.userList[0].socketID ||
              Storage.roomId?.slice(20, 40) ==
                this.userData.userList[0].socketID)) ||
          Storage.roomId == this.commonRoomId
        );
      });
      console.log('this is send message storeIndex', storeIndex);
  
      if (storeIndex > -1) {
        this.storageArray[storeIndex].chats.push({
          user: this.personName,
          message: this.newMessage,
        });
        this.messageArray = this.storageArray[storeIndex].chats;
      } else {
        let updatedStorage = {
          roomId: this.commonRoomId,
          chats: [
            {
              user: this.personName,
              message: this.newMessage,
            },
          ],
        };
        this.storageArray.push(updatedStorage);
  
        this.messageArray = updatedStorage.chats  ;
        console.log(" this.messageArray >>>>>>>>", this.messageArray );
        
        // this.messageArray=this.storageArray[0].chats
      }
  
      this.chatService.setStorage(this.storageArray);
  
      this.newMessage = '';
    }else{
      this._snackbar.open("please select members or enter valid value",'',{
        duration:2000,
        verticalPosition:'top'
      })
    }
   
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  selectedUserName!: String;

  userSelected(selectedUser?: any) {

    this.showImage=false

    this.roomId = selectedUser?.socketID;
    console.log('user selected called>>>>>>>>>>>>>>>',this.roomId);

    this.selectedUserName = selectedUser?.name;
    if (this.roomId) {
      this.commonRoomId = this.roomId + this.userData.userList[0].socketID;
    } else {
     
      this.commonRoomId = this.selectedUserName;
      this.joinGroup(this.selectedUserName)
    }

    console.log('this is common roomid', this.commonRoomId);

    this.storageArray = this.chatService.getStorage();

    console.log('storegearray', this.storageArray);

    const storeIndex = this.storageArray.findIndex(
      (Storage) => {
        console.log('this is userselected called...........');

        return (
          ((Storage.roomId?.slice(0, 20) == this.roomId ||
            Storage.roomId?.slice(20, 40) == this.roomId) &&
            (Storage.roomId?.slice(0, 20) ==
              this.userData.userList[0].socketID ||
              Storage.roomId?.slice(20, 40) ==
                this.userData.userList[0].socketID)) ||
          (Storage.roomId == this.commonRoomId)
        );
      }
      // console.log("this is slice 1",Storage.roomId.slice(20,40),this.roomId, Storage.roomId.slice(20,40)==this.roomId);
    );
    console.log('storeIndex', storeIndex);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
      console.log(
        'message array get filled in user selected function..........'
      );
    } else {
      this.messageArray = [];
      console.log("this.messageArray = [] called.............");
      
    }
  }

  groups: any;

  groupCreated(groupName: any){
    if(groupName.trim().length!=0){
      this.roomName = groupName;
    this.groups = {
      name: this.roomName,
    };
    this.socket.emit("group create",this.groups)  
    }else{
      this._snackbar.open("pleae enter valid group name",'',{
        duration:3000
      })
    }
    
  }

  joinGroup(groupName: any) {
    // this.chatService.getSocketID().emit('join-room', groupName);
    this.roomName = groupName;
    this.groups = {
      name: this.roomName,
      personName:this.personName
    };
    // this.activeUserArray.push(this.groups);

    this.chatService.getSocketID().emit('join-room', this.groups,(message:any)=>{
      console.log("this is callback message .....",message);
      
        this.joinedMessage=message
        console.log("joined mesaage ..",this.joinedMessage);
        
      
    });

    console.log("user joined the room....");
    


    // this.chatService.sendGroupName(groupName)
    
    console.log('activeUserArray', this.activeUserArray);
  }

  sendMessageToRoom(inputValue?: any) {

    console.log("this is group name",);
    

    if(this.newMessage?.trim().length!=0 && this.selectedUserName){

      this.content= this.newMessage;
      console.log("this is content.....",this.content);

      this.nonEditedContent = this.content;
      this.content = this.formatContent(this.content);
  
      this.chatService.sendMessageToGroup(this.newMessage, this.roomName).subscribe((message: any) => {
        // alert('eeeeeeeeeeeeeeeee');
        this.messageList.push(message);
  
        console.log('this is grop cht mesg', message);
  
        this.storageArray = this.chatService.getStorage();
        const storeIndex = this.storageArray.findIndex(
          (Storage) => {
            console.log(
              '-------------- .in ngoninit()',
              Storage.roomId == this.commonRoomId,Storage.roomId,this.commonRoomId
            );
  
            return (Storage.roomId == this.commonRoomId);
          }
          // console.log("this is slice 1",Storage.roomId.slice(20,40),this.roomId, Storage.roomId.slice(20,40)==this.roomId);
        );
        console.log('storeIndex', storeIndex);
  
        if (storeIndex > -1) {
          console.log("this is data pushed in find index.....");
          
          this.storageArray[storeIndex].chats.push({
            user: this.personName,
            message: this.newMessage,
          });
          this.messageArray = this.storageArray[storeIndex].chats;
        } else {
          console.log('this is new data created in local storage..... ');
  
          let updatedStorage = {
            roomId: this.commonRoomId,
            chats: [
              {
                user: this.personName,
                message: this.newMessage,
              },
            ],
          };
          this.storageArray.push(updatedStorage);
          this.messageArray = updatedStorage.chats  ;
          // this.messageArray = [updatedStorage];
          // this.messageArray=this.storageArray[0].chats
        }
  
        this.chatService.setStorage(this.storageArray);
      });
     
  
      this.newMessage = '';
  
      this.chatService.getMessageFromGroup()

    }else{
      this._snackbar.open("please select members",'',{
        duration:2000
      })
    }
  
    console.log('group chat function called....');

 
  }

  typing(){
    document.getElementById("message-input")?.addEventListener('keypress',()=>{
      console.log("typing.........");
      this.socket.emit("typing",this.personName)
      
    })
  }

}


