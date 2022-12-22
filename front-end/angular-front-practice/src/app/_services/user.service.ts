import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API: string = 'http://localhost:8080/api/v1/';

  requestHeader = new HttpHeaders(
    {'No-Auth': 'true'}
  );

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
    ) { }

  public login(loginData: any){
    return this.httpClient.post(this.PATH_OF_API+ 'login', 
    loginData, 
    {headers: this.requestHeader});
  }

  public checkRoles(allowedRoles: any): boolean{
    const userRoles: any = this.userAuthService.getRoles();

    if(userRoles !== null){
      for(let i=0; i< userRoles.length; i++){
        for(let j =0; j<allowedRoles.length ; j++ ){
          if(userRoles[i].roleName === allowedRoles[j]){
            return true;
          }
        }
      }
    }
    return false;
  }
}
