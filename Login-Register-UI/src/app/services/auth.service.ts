import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token.api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseApiUrl : string = environment.baseApiUrl;
private userPayload : any;
constructor(private http : HttpClient, private router : Router) {
  this.userPayload = this.decryptToken();
 }


register(userObj : any){
  return this.http.post<any>(this.baseApiUrl + '/api/User/register',userObj);
}

login(loginObj  :any){
  return this.http.post<any>(this.baseApiUrl + '/api/User/authenticate',loginObj);
}

//To store JWT Token
storeToken(tokenValue : string){
  localStorage.setItem('token',tokenValue);
}
getToken(){
  return localStorage.getItem('token');
}

//To store RefreshToken
storeRefreshToken(tokenValue : string){
  localStorage.setItem('refreshToken',tokenValue);
}
getRefreshToken(){
  return localStorage.getItem('refreshToken');
}

isLoggedIn() : boolean {
  //it returns a string but (!!) it converts into boolean
  return !! localStorage.getItem('token');
}

signOut()
{
  localStorage.clear();
  this.router.navigate(['login']);
}

decryptToken(){
  const jwtHelper = new JwtHelperService
  const token = this.getToken()!;
  return jwtHelper.decodeToken(token)
}

getUsernameFromToken(){
  if(this.userPayload)
  {
    return this.userPayload.unique_name;
  }
}
getRoleFromToken(){
  if(this.userPayload)
  {
    return this.userPayload.role;
  }
}

renewToken(tokenApi : TokenApiModel){
  return this.http.post<any>(this.baseApiUrl + '/api/User/refresh',tokenApi);
}
}
