import { Component } from '@angular/core';
import { Observable, async } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userEmail!:any;

isloggedIn$ !:Observable<boolean> 
constructor(private authService : AuthService){


  let currentUser = JSON?.parse(localStorage.getItem('user') !);
  this.userEmail = currentUser?.email
  this.isloggedIn$ = this.authService.isLoggedIn()
  console.log(this.userEmail)
  
}

onClick(){
  this.authService.logout()
}
}
