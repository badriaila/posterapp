import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private url = 'http://localhost:3000/api/forgetpassword';
  constructor(private http:Http) { }

  getLink(email,callback){
  this.http.post(this.url,email)
  .subscribe(response=>{
    callback(null,response.json())
  },error=>{
    callback(error.json(),null)
  })
  }

  resetPassword(password,token,callback){
  this.http.put(`${this.url}/?token=${token}`,password)
  .subscribe(response=>{
    callback(null,response.json())
  },error=>{
    callback(error.json(),null)
  })
  }
}
