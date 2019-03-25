import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SigninOrSignupComponent} from './signin-or-signup/signin-or-signup.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { AccountComponent } from './account/account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AutoLoginService } from './services/auto-login.service';



const routes : Routes = [
{path:'', redirectTo:'signin-or-signup', pathMatch:'full'},
{path:'signin-or-signup', component:SigninOrSignupComponent, canActivate:[AutoLoginService]},
{path:'resetpassword', component:ResetPasswordComponent},
{path:'account', component:AccountComponent,
   children:[
     {path:'', redirectTo:'home', pathMatch:'full' },
     {path:'home', component:HomeComponent},
     {path:'create-post', component:CreatePostComponent},
     {path:'all-posts', component:ViewPostsComponent},
     {path:'my-posts', component:ViewPostsComponent},
     {path:'**', component:PageNotFoundComponent}
   ],
   canActivate:[AuthGuardService]
},
{path:'**', component:PageNotFoundComponent}
]



@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
