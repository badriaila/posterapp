import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {

  constructor(private posts : PostsService, private profiles : ProfileService ) { }


  ngOnInit() {
    this.posts.getPosts((error,response)=>{
      if(error){
        this.errorMessage = error.response;
      }else{
        this.profiles.getProfile((error,res)=>{
          this.myId = res.response[0]._id;
          const allPosts = response.response;
          if(window.location.pathname == '/account/my-posts'){
            this.allPosts = allPosts.filter(x=>x.postedBy == this.myId);
            if(!this.allPosts.length){
              this.errorMessage = 'Oops.! No Posts Found'
            }
          }else{
            this.allPosts = allPosts; 
            if(!this.allPosts.length){
              this.errorMessage = 'Oops.! No Posts Found'
            }
          }
        })
      }
    })
    this.profiles.getUsers((error,response)=>{
      this.users = response.response;
    })
  }
  updatedId='';
  successMessage ='';
  errorMessage =''; 
  myId='';
  allPosts = [];
  users = [];

  post = {
    _id : 'id',
    title : 'title',
    message : ' message'
  }

  onUpdated(input){
    this.successMessage = input.message;
    this.updatedId = input.id;  
    this.ngOnInit();
  }

  getName(id){
    const data = this.users.find(x=> x._id == id);
    return data.firstName+ ' ' +data.lastName;
  }

  editPost(post){
    this.post = post;
  }

  deletePost(id){
    this.posts.deletePost(id,(error,response)=>{
      if(error){
        this.errorMessage = error.response;
      }else{
        const index = this.allPosts.findIndex(x=> x._id == id);
        this.allPosts.splice(index,1);
        this.errorMessage = 'Post Deleted Successfully'
      }
    })
  }

}

