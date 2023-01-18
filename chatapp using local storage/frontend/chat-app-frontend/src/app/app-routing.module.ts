import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './component/chat/chat.component';
import { ReadMoreComponent } from './component/read-more/read-more.component';
import { GuardService } from './guards/guard.service';

const routes: Routes = [
  {path:'',redirectTo:'/login', pathMatch: 'full'},
  {path:'login',loadChildren:()=>import('./modules/account/login/login.module').then(m=>m.LoginModule)},
  {path:'chat',component:ChatComponent ,
  // children: [
  //   {
  //     path: '',
  //     component: ChatComponent,
      
  //   }],
    canActivate : [GuardService] 
  },
  {path:'**', redirectTo:'/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
