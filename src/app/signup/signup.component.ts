import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import {CustomValidators} from 'ngx-custom-validators';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private signup: SignupService, private router : Router) { }

  ngOnInit() {
  }

  invalidSignup = false;
  errorMessage = 'invalid signup';


  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/)
  ]);

  form = new FormGroup({
    firstName:new FormControl('',Validators.required),
    lastName:new FormControl('', Validators.required),
    username:new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
    email:new FormControl('',[
      Validators.required,
      CustomValidators.email
    ]),
    password:this.password,
    confirmPassword:new FormControl('',[
      Validators.required,
      CustomValidators.equalTo(this.password)
    ]),
    termsAndConditions:new FormControl(true,CustomValidators.equal(true))
  })

  submit(){
    const formData ={
      firstName : this.form.value.firstName,
      lastName : this.form.value.lastName,
      username : this.form.value.username,
      email : this.form.value.email,
      password : this.form.value.password,
      termsAndConditions : this.form.value.termsAndConditions
    }
    this.signup.signUp(formData,(error,response)=>{
      if(error){
        this.invalidSignup = true;
        this.errorMessage = error.response;
      }else{
        this.router.navigate(['account']);
      }
    })
  }
}
