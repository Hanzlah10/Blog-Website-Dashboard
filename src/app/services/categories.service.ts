import { Injectable } from '@angular/core';
import { Firestore, collection ,addDoc, collectionData,doc, updateDoc, deleteDoc} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private firestore:Firestore) { }

  saveData(data:object){
   const dataInstance = collection(this.firestore,'collections')
   return addDoc(dataInstance,data)
  }


  loadData(){
   const dataInstance = collection(this.firestore,'collections')
   return collectionData(dataInstance, {idField:'id'})
  }

  editData(id:string,data:object){
    const dataInstance = doc(this.firestore,'collections',id)
    return updateDoc(dataInstance,data)
  }

  deleteData(id:string){
    const dataInstance = doc(this.firestore,'collections',id)
    return deleteDoc(dataInstance)

  }
}
