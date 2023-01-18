import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userData:UserDataService,
              private router:Router,
              private http:HttpClient,
              private fb:FormBuilder,
              private _snackbar:MatSnackBar) { }

  currentUser!:String;
  phoneNo!:Number;
  loginForm!:FormGroup;
  data:any[]=[]
  ngOnInit(): void {

   this.http.get("http://localhost:3000").subscribe((data:any)=>{
    this.data = data
    console.log("active users...",data);
    
   })

    this.loginForm = this.fb.group({
      userName:['',[Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(10)]],
      phoneNo:['',[Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]]
    })

    console.log("loginForm validity...",this.loginForm.valid);
    
    
  }
  token:any;
  userExist:any[]=[];

   login(username:any,phoneno:any){

    this.http.post("http://localhost:3000/login",{name:username.value}).subscribe((data:any)=>{
      console.log("this is post request data....",data);
      
    })

    console.log("comparision value.....",this.data[0]?.name,username.value);
    
    this.userExist = this.data.filter((item)=>{
      return item.name == username.value
    })

    // for(let i=0;i<this.data.length;i++){
    //   if(this.data[i]?.name==username.value){
    //     this.userExist=true
    //     this._snackbar.open("user already exist",'',{
    //       duration:2000,
    //       verticalPosition:'top'
    //     })
    //   }else{
    //     this.userExist=false;
    //   }
    // }
    

    if(this.loginForm.controls.userName.value)
    console.log(username.value,phoneno.value);
    this.loginForm.controls['userName'].patchValue(this.loginForm.controls['userName'].value?.trim());
    this.userData.userList[0].name=username.value;
    this.userData.userList[0].phone=phoneno.value
    console.log(this.userData.userList  );
    if(this.userExist.length>0){
      this._snackbar.open("user already exist",'',{
              duration:2000,
              verticalPosition:'top'
            })
      this.router.navigate([''])
    }else{
      this.router.navigate(['chat'])

    }
    
    this.token = phoneno.value

    localStorage.setItem('token',this.token)
    this.userData.loginForm=this.loginForm
  }

}
