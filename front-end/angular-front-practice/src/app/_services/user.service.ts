import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import {User} from "../model/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API: string = 'http://localhost:8081/api/v1/';

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

  public register(registerData: any){
    return this.httpClient.post(this.PATH_OF_API+"register",
      registerData);
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

  public getPsy(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.PATH_OF_API+ "get-psychologists", {headers: this.getHeader()});
  }

  public getHeader(): HttpHeaders {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('Authorization', 'Bearer_' + localStorage.getItem("jwtToken"));
    return header;
  }
}
