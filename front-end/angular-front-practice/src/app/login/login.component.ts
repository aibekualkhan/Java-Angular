import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
    ) {}


  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe({
      next: (response: any) => {
        this.userAuthService.setRoles(response.user.roles);
        this.userAuthService.setToken(response.token);

        const role = response.user.roles[0].roleName;
        if(role === 'ROLE_ADMIN'){
          this.router.navigate(['/admin'])
        }else{
          this.router.navigate(['/user'])
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
