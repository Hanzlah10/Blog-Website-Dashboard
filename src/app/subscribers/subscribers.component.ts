import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {

subData!:Observable<any>
  constructor(private postService: PostService){
   this.loadData()
  }


loadData(){
  this.subData = this.postService.loadSubcribersData()
  // console.log(this.subData)
}
onDelete(id:any){
  this.postService.deleteSubcribersData(id).then(()=>{
    console.log(" suncriber deleted ")
  })
}
}
