import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import {RegistrationComponent} from "./registration/registration.component";
import {TherapistsComponent} from "./therapists/therapists.component";
import {OnlineCounsellingComponent} from "./online-counselling/online-counselling.component";

const routes: Routes = [

  { path: '' , component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']} },
  { path: 'user', component: UserComponent, canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN', 'ROLE_USER', 'ROLE_PSY']} },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'therapists', component: TherapistsComponent},
  { path: 'online-counselling', component: OnlineCounsellingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
