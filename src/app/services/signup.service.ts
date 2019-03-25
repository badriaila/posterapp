import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private url='http://localhost:3000/api/signup';
  constructor(private http:Http) { }

  signUp(data,callback){
    this.http.post(this.url, data)
    .subscribe(response =>{
      const token = response.json().token;
      sessionStorage.setItem('token',token);
      callback(null,response.json())
    },error=>{
      callback(error.json(),null)
    })
  }
}
