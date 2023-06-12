import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../_services/user.service";
import {UserAuthService} from "../_services/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  register(registerForm: NgForm) {
    this.userService.register(registerForm.value).subscribe({
      next: (response: any) => {
        this.router.navigate(['/login'])
        // this.userAuthService.setRoles(response.user.roles);
        // this.userAuthService.setToken(response.token);
        //
        // const role = response.user.roles[0].roleName;
        // if(role === 'ROLE_ADMIN'){
        //   this.router.navigate(['/admin']);
        // }else{
        //   this.router.navigate(['/user']);
        // }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
