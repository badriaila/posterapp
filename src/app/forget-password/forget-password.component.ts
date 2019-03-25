import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { ForgetPasswordService } from '../services/forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private forgetPassword : ForgetPasswordService) { }

  ngOnInit() {
  }

  errorMessage = '';
  resetLink = '';

 form = new FormGroup({
   email: new FormControl('',[
     Validators.required,
     CustomValidators.email
   ])
 })

 getLink(){
   this.forgetPassword.getLink(this.form.value,(error,response)=>{
     if(error){
       this.errorMessage = error.response;
     }else{
      this.errorMessage = '';
      this.resetLink = response.response;
     }
   })
 }

}
