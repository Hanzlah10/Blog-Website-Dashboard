import { Component } from '@angular/core';
import { setTimeout } from "timers/promises";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent {

  categories !: Observable<any>
  htmlContent: any;
  postForm!: FormGroup
  data!: any
  docId!: any
  formStatus:string = "Add New"
  permalink!: string;
  selectedImg !: string;
  imgSrc: any = "./assets/IMG_Placeholder.png"
  fireBaseImgPath !: string

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostService,
    private toast: ToastrService,
    private route: ActivatedRoute) {
    this.loadCategoryData()


  }



  ngOnInit(){
    this.route.queryParams.subscribe(async (val: any) => {
      this.docId = val.id
      console.log(this.docId)


      if (val.id) {

       await this.postService.loadOneData(val.id).then(()=>{
          console.log("loaded")
        })
        

        this.postForm = this.fb.group({
          title: [this?.postService?.oneData?.title, [Validators.required,
          Validators.minLength(10)]],
  
          permalink: [this?.postService?.oneData?.permalink, Validators.required],
  
          excerpt: [this?.postService?.oneData?.excerpt, [Validators.required,
          Validators.minLength(50)]],
  
          category: [`${this?.postService?.oneData?.category?.categoryId}-${this?.postService?.oneData?.category?.category}`, Validators.required],
          postImg: [''],
          content: [this?.postService?.oneData?.content, Validators.required]
        })
        this.imgSrc = this.postService.oneData.postImgPath
        this.formStatus = "Edit"

      }
      else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required,
          Validators.minLength(10)]],

          permalink: ['', Validators.required],

          excerpt: ['', [Validators.required,
          Validators.minLength(50)]],

          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required]
        })
        this.formStatus =="Add New"
      }

    })



  }
  //sending all these to template
  get fc() {
    return this?.postForm?.controls
  }



  //for permalink
  onKeyUp($event: any) {

    const title = $event.target.value;
    this.permalink = title.toLowerCase().replace(/\s/g, '-');

  }

  //for showing selected image
  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];



  }

  imgpath() {
    this.postService.uploadImage(this.selectedImg)
    this.fireBaseImgPath = this.postService.downloadUrl

  }


  //fetching categories
  loadCategoryData() {
    this.categories = this.categoryService.loadData()
    // console.log(this.categories)
  }







  //taking data from the form to store in db
  onSubmit() {


    let splittedCategoryData = this.postForm.value.category.split('-');//splits category into two part as it has id and name in it.

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splittedCategoryData[0],//category id
        category: splittedCategoryData[1],//category name
      },
      postImgPath: this.postService.downloadUrl,
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()

    }

// console.log(postData)

 if(this.formStatus == "Edit"){
  this.postService.updateData(this.docId,postData).then(() => {
    this.toast.success('Data Updated !')
    // console.log(postData.postImgPath)
    //for resetting the form
    this.postForm.reset()
    this.imgSrc = "./assets/IMG_Placeholder.png"
  })
 }
 else if(this.formStatus =="Add New"){
  this.postService.saveData(postData).then(() => {

    this.toast.success('Data Saved Successfully')
    // console.log(postData.postImgPath)
    //for resetting the form
    this.postForm.reset()
    this.imgSrc = "./assets/IMG_Placeholder.png"
  })
 }
  }

 
//connect to firestore in


//   editorConfig: AngularEditorConfig = {
//     editable: true,
//     spellcheck: true,
//     minHeight: '',
//     maxHeight: 'auto',
//     width: 'auto',
//     minWidth: '0',
//     translate: 'no',
// }



}




