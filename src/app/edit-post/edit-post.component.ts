import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnChanges {

  constructor(private posts : PostsService) { }

  @Input() post;
  @Output() update = new EventEmitter();

  errorMessage='';
  successMessage ='';

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


  updatePost(){
  const data={
    _id : this.post._id,
    title:this.form.value.title,
    message:this.form.value.message
  }
    this.posts.updatePost(data,(error,response)=>{
      if(error){
        this.errorMessage = error.response
      }else{
        this.update.emit({message:'successfully updated',id:data._id});
      }
    })
  }

  ngOnInit() {}
  ngOnChanges() {
    this.form.get('title').setValue(this.post.title);
    this.form.get('message').setValue(this.post.message);
  }

}
