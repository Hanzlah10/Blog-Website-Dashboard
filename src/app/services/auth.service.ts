import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  loggedInGuard: Boolean = false
  constructor(private auth : Auth, private toastr: ToastrService, private router: Router) { }

  login(email:string,pass:string){
    this.loggedIn.next(true)
    this.loggedInGuard = true

    return signInWithEmailAndPassword(this.auth,email,pass)


  }

  logout(){
    this.auth.signOut().then(()=>{
      this.loggedIn.next(false)
      this.loggedInGuard = false
      this.toastr.success("Logged Out Successfully !")
      localStorage.removeItem('user')
      this.router.navigate(['/login'])
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable()
    }
}
