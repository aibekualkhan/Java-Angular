import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []){

    localStorage.setItem('roles', JSON.stringify(roles));

    console.log(this.getRoles());
  }

  public getRoles(): []{
    return JSON.parse(localStorage.getItem('roles')!);
  }

  public setToken(token: string){
    localStorage.setItem('jwtToken', token);
    console.log(this.getToken());
  }

  public getToken(): string{
    return localStorage.getItem('jwtToken')!;
  }

  public clear(): void{
    localStorage.clear();
    console.log(this.getRoles());
    console.log(this.getToken());
  }

  public isAuthenticated(){
    return this.getToken() && this.getRoles();
  }


}
