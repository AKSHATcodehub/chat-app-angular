import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './component/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { SignupComponent } from './modules/account/signup/signup.component';
import { TestingComponent } from './modules/account/testing/testing.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReadMoreComponent } from './component/read-more/read-more.component';
// import { ChatRoomComponent } from './component/chat-room/chat-room.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    SignupComponent,
    TestingComponent,
    ReadMoreComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
