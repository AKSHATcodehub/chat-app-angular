import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface userListData{
  socketID:any;
  name:String;
  phone:Number;
}

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  constructor() { }

  loginForm!:FormGroup;

  userList= [
    {
      socketID:null    ,
      name:"",
      phone:null
    }
  ]
}
