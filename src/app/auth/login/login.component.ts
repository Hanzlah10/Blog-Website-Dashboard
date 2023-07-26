import { Component } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   
  constructor(private authService: AuthService, private router : Router, public toastr : ToastrService,private auth:Auth){

  }

  onSubmit(loginForm:any){
    this.authService.login(loginForm.email,loginForm.password).then(()=>{
      this.router.navigate([''])
      this.loadUser()
      this.toastr.success("Login Successfull !")
    })
    .catch((err)=>{
      console.log(err)
      this.toastr.warning("Invalid Details !")
    })
  }

  loadUser(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // console.log(user.toJSON())
        localStorage.setItem('user', JSON.stringify(user))
        // https://firebase.google.com/docs/reference/js/auth.user
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    
  }

  

}
