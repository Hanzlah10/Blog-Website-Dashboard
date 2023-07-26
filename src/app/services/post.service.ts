import { Injectable } from '@angular/core';
import { collection, collectionData ,deleteDoc,doc, getDoc, updateDoc} from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "@angular/fire/storage";
import { addDoc } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public storage: Storage, private fireStore: Firestore, private toastr : ToastrService) { 
    
  }

  oneData!:any;
  downloadUrl!:string;
  

  uploadImage(selectedImg: any) {

    
    // console.log(filePath)
   const filePath = `postImg/${Date.now()}`
    const storageRef = ref(this.storage, filePath);
    // console.log(storageRef)
    const uploadTask = uploadBytesResumable(storageRef, selectedImg);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.downloadUrl = downloadURL
        });
      }
    );
  }


   

  saveData(PostData:any){
    const dataInstance = collection(this.fireStore,'posts');
    return addDoc(dataInstance, PostData)

  }

  loadData(){
    const dataInstance = collection(this.fireStore,'posts');
    return collectionData(dataInstance, {idField:'id'})

  }

  async loadOneData(id:string){
    
    const docRef = doc(this.fireStore, "posts/", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.oneData = docSnap.data()
    } else {
      console.log("No such document!");
    }
  }

  updateData(id:string,postData:any){
    const dataInstance = doc(this.fireStore,'posts',id);
    return updateDoc(dataInstance,postData)
  }

  deleteImg(postImgPath:any,id:string){
    const desertRef = ref(this.storage, postImgPath);
      deleteObject(desertRef).then(() => {
        this.deleteDatae(id)
  }).catch((error) => {
  });
  }


  deleteDatae(id:string){
    const dataInstance = doc(this.fireStore,'posts',id)
    this.toastr.warning("Data Deleted !")
     return deleteDoc(dataInstance)
  }

  setFeatured(id:string, featuredData:any){
    const dataInstance = doc(this.fireStore,'posts',id)
    return updateDoc(dataInstance,featuredData).then(()=>{
      this.toastr.info("Featured Status Updated!")
    })
  }

  loadSubcribersData(){
      const dataInstance = collection(this.fireStore,'subscribers');
      return collectionData(dataInstance, {idField:'id'})
  }

  deleteSubcribersData(id:any){
      const dataInstance = doc(this.fireStore,'subscribers',id);
      this.toastr.warning("Removed Subscriber !")
      return deleteDoc(dataInstance)
  }

  



}

