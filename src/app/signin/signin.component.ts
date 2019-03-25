import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router : Router, private signin : SigninService) { }

  ngOnInit() {
  }

  
  form = new FormGroup({
    usernameOrEmail : new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.pattern(/(?=.*[A-Z])(?=.*[a-z0])(?=.*[0-9])/),
      Validators.minLength(6)
    ])
  })

  invalidLogin = false;
  errorMessage = 'invalid username or password';
  remember=false;

  login(){
    this.signin.signin(this.form.value,(error,response)=>{
      if(error){
        const err = error
        this.invalidLogin = true;
        this.errorMessage= err.response;
        console.log(error)
      }
      else{
        if(this.remember){
          localStorage.setItem('token', response.token)
        }else{
          sessionStorage.setItem('token', response.token)
        }
        this.router.navigate(['account']);
      }
    })
  }

}
