import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent {

postArray !: Observable<any>


  constructor(private postService : PostService,private route: ActivatedRoute){

  this.loadData()
 
  

  }
  
  


  loadData(){
    this.postArray =  this.postService.loadData()
  }

  onDelete(postImgPath:string,id:string){
    this.postService.deleteImg(postImgPath,id)
  
  }

  onFeatured(id:string,val:boolean){
   const featuredData = {
      isFeatured : val
    }
    this.postService.setFeatured(id,featuredData)
  }
}
