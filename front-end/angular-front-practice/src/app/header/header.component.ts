import { Component } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ){}

  public isAuthenticated(){
    return this.userAuthService.isAuthenticated();
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/home'])
  }

  public checkRoles(allowedRoles: any): boolean{
    return this.userService.checkRoles(allowedRoles);
  }
}
