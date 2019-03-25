import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private url='http://localhost:3000/api/signin';
  constructor(private http:Http) { 
    const headers = new Headers();
  }


  signin(credentials,callback){
    this.http.post(this.url,credentials)
    .subscribe(response=>{
      callback(null,response.json());
    },error=>{
      callback(error.json(),null)
    })
  }
}
