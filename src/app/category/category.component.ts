import { Component, ViewChild } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {


  
inputValue!: string;//for clearing input 
@ViewChild('myInput') myInputField: any;


userData !: Observable<any>
CategoryName!: string;
formStatus:string = "Add"
id!: string;

constructor(private categoryService: CategoriesService,private toast: ToastrService){
  this.loadData()

}
 
onSubmit(formData:any) {
  let f : Category = {
    category: formData.category
  }

  if (this.formStatus == "Add"){

      this.categoryService.saveData(f)
      .then(()=>{
        this.toast.success('Data Inserted Successfully!')
        console.log("add")
      })
      .catch((err)=>{
        console.log(err)
      })   
  }
  else if(this.formStatus == "Edit"){
      this.categoryService.editData(this.id,f).then(()=>{
        console.log("edited")
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  this.myInputField.nativeElement.value = '';
  this.formStatus = "Add"
  

}

loadData(){
  this.userData = this.categoryService.loadData()
  // this.userData.subscribe((val)=>{
  //   console.log(val)
  // })
  console.log(this.userData)
}
onEdit(formCategory:any,id:string){
  this.CategoryName = formCategory
  this.formStatus = "Edit"
  this.id = id
  // console.log(id)
}
onDelete(id:string){
  this.toast.success('Data Deleted!')
  this.categoryService.deleteData(id);

}


}