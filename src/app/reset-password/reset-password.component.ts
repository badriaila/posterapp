import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { ForgetPasswordService } from '../services/forget-password.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private forgetPassword : ForgetPasswordService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }
  errorMessage='';
  token = '';
  success = false;

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/)
  ]);

  form = new FormGroup({
    password:this.password,
    confirmPassword:new FormControl('',[
      Validators.required,
      CustomValidators.equalTo(this.password)
    ]),
  })

  resetPassword(){
    const data = {
      password :this.form.value.password
    }
    this.forgetPassword.resetPassword(data,this.token,(error,response)=>{
      if(error){
        this.errorMessage=error.response;
      }else{
        this.success = true;
      }
    })
  }


}
