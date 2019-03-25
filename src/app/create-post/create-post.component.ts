import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private posts: PostsService) { }

  ngOnInit() {
  }

  errorMessage = '';
  successMessage = '';

  form = new FormGroup({
    title:new FormControl('', [
      Validators.required,
      Validators.minLength(15)
    ]),
    message: new FormControl('',[
      Validators.required,
      Validators.minLength(150)
    ])
  })

  createPost(){
    this.posts.createPost(this.form.value,(error,response)=>{
      if(error){
        this.errorMessage = error.response;
      }else{
        this.successMessage = 'Post successfully created'
        this.form.reset();
      }
    })
  }

}
