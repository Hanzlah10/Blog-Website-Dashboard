import {  CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authguardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const authService = inject(AuthService)
  const toastr = inject(ToastrService)

  if(authService.loggedInGuard){
    // console.log("Granted")
    return true
  }
  else{
    router.navigate(['login'])
    toastr.warning("Login to gain Access","Access Denied!")
    // console.log("Denied")
    return false
  }
};

 
