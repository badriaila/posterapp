import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { ProfileService } from '../services/profile.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( 
    private profile: ProfileService,
    private posts : PostsService
    ) {
  }

  ngOnInit() {
    this.profile.getProfile((error,response)=>{
      if(error){
        this.errorMessage = error.response;
        console.log(error);
      }else{
        this.data = response.response[0];
      }
    })
    this.posts.getPosts((error,response)=>{
      const posts = response.response;
      const count = posts.filter(x=>x.postedBy == this.data._id).length;
      this.data.count = count;
    })
  }

  successMessage='';
  errorMessage= '';
  data={_id:'',count:''};

changeEmail=false;
changePassword=false;
deleteAccount=false;

email(){
  this.changeEmail=true;
}
password(){
  this.changePassword=true;
}
delete(){
  this.deleteAccount=true;
}
cancel(){
  this.changeEmail=false;
  this.changePassword=false;
  this.deleteAccount=false;
}


 emailForm = new FormGroup({
   email: new FormControl('',[
     Validators.required,
     CustomValidators.email
   ])
 })

 newPassword = new FormControl('',[
  Validators.required,
  Validators.minLength(6),
  Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)
]);

 passwordForm = new FormGroup({
   oldPassword: new FormControl('',[
     Validators.required,
     Validators.minLength(6),
     Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)
   ]),
   newPassword: this.newPassword,
  confirmPassword: new FormControl('',[
    Validators.required,
    CustomValidators.equalTo(this.newPassword)
  ])
 })

 checkPassword= new FormGroup({
  password: new FormControl('',[
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)
  ])
 })

 updateEmail(){
   const data = {email:this.emailForm.value.email}
   this.profile.changeEmail(data,(error,response)=>{
     if(error){
       this.errorMessage = error.response;
     }else{
       this.successMessage='successfully updated email';
       this.changeEmail=false;
       this.changePassword=false;
       this.deleteAccount=false;
     }
   })
 }

 updatePassword(){
   const data = {oldPassword:this.passwordForm.value.oldPassword,newPassword:this.passwordForm.value.newPassword}
   this.profile.changePassword(data,(error,response)=>{
    if(error){
      this.errorMessage = error.response;
    }else{
      this.successMessage='successfully changed password';
      this.changeEmail=false;
      this.changePassword=false;
      this.deleteAccount=false;
    }
   })
 }

 removeAccount(){
   const password =this.checkPassword.value.password;
   console.log(password)
   this.profile.deleteAccount(password,(error,response)=>{
    if(error){
      this.errorMessage = error.response;
    }else{
      this.successMessage='successfully deleted your account';
    }
   })
 }

}
