import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url='http://localhost:3000/api/profile';
  constructor(private http: Http) {}

  getUsers(callback){
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    this.http.get(`${this.url}/?token=${token}`)
    .subscribe(response=>{
      callback(null,response.json())
    },error=>{
      callback(error.json(),null)
    })
  }
  
  getProfile(callback){
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    this.http.get(`${this.url}/myprofile/?token=${token}`)
    .subscribe(response=>{
      callback(null,response.json())
    },error=>{
      callback(error.json(),null)
    })
  }

  changeEmail(email,callback){
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    this.http.put(`${this.url}/email/?token=${token}`, email)
    .subscribe(response=>{
      callback(null,response.json())
    },error=>{
      callback(error.json().null)
    })
  }

  changePassword(password,callback){
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    this.http.put(`${this.url}/password/?token=${token}`, password)
    .subscribe(response=>{
      callback(null,response.json())
    },error=>{
      callback(error.json(),null)
    })
  }

  deleteAccount(password,callback){
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    this.http.delete(`${this.url}/${password}/?token=${token}`)
    .subscribe(response=>{
      callback(null,response.json())
    },error=>{
      callback(error.json(),null)
    })
  }

}
