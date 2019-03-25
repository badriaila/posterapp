import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http'
import { OrderModule } from 'ngx-order-pipe';

import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SigninOrSignupComponent } from './signin-or-signup/signin-or-signup.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { AccountComponent } from './account/account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SignupService } from './services/signup.service';
import { SigninService } from './services/signin.service';
import { ProfileService } from './services/profile.service';
import { PostsService } from './services/posts.service';
import { ForgetPasswordService } from './services/forget-password.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AutoLoginService } from './services/auto-login.service';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SigninOrSignupComponent,
    SigninComponent,
    SignupComponent,
    CreatePostComponent,
    ViewPostsComponent,
    AccountComponent,
    PageNotFoundComponent,
    EditPostComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    OrderModule
  ],
  providers: [
    SignupService,
    SigninService,
    ProfileService,
    PostsService,
    ForgetPasswordService,
    AuthGuardService,
    AutoLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
