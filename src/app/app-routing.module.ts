import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { authguardGuard } from './services/authguard.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { AboutComponent } from './components/about/about.component';
import { TermsandconditonComponent } from './components/termsandconditon/termsandconditon.component';

const routes: Routes = [
  {path:'',component:DashboardComponent, canActivate: [authguardGuard]},
  {path:'login',component:LoginComponent},
  {path:'category',component:CategoryComponent,canActivate: [authguardGuard]},
  {path:'post',component:AllPostComponent,canActivate: [authguardGuard]},
  {path:'post/new', component:NewPostComponent,canActivate: [authguardGuard]},
  {path:'subscribers', component:SubscribersComponent,canActivate: [authguardGuard]},
  {path:'about', component:AboutComponent,canActivate: [authguardGuard]},
  {path:'terms', component:TermsandconditonComponent,canActivate: [authguardGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
