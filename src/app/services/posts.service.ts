import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url = 'http://localhost:3000/api/posts';
  constructor(private http:Http) { }

  getPosts(callback){
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    this.http.get(`${this.url}/?token=${token}`)
    .subscribe(response=>{
      callback(null,response.json())
    },error=>{
      callback(error.json(),null);
    })
  }

  createPost(post,callback){
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    this.http.post(`${this.url}/?token=${token}`,post)
    .subscribe(response=>{
      callback(null,response.json())
    },error=>{
      callback(error.json(),null)
    })
  }

  updatePost(post,callback){
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    this.http.put(`${this.url}/?token=${token}`,post)
    .subscribe(response=>{
      callback(null,response.json())
    },error=>{
      callback(error.json(),null)
    })
  }

  deletePost(postId,callback){
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    this.http.delete(`${this.url}/${postId}/?token=${token}`)
    .subscribe(response=>{
      callback(null,response.json())
    },error=>{
      callback(error.json(),null)
    })
  }
}
