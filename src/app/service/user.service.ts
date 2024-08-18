import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = "http://localhost:8080";
  private requestHeaders = new HttpHeaders({
    'No-Auth': 'True',
    'Content-Type': 'application/json'

  });
   constructor(private httpClient:HttpClient,private userAuth:UserAuthService) { }

  public logins(loginData:any){


    return this.httpClient.post(this.BASE_URL+"/authenticate",loginData,{headers:this.requestHeaders});
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this.httpClient.post(this.BASE_URL + "/authenticate", loginData, { headers, responseType: 'text' });
  }

  public registers(loginData:any){


    return this.httpClient.post<any>(this.BASE_URL+"/user/register-new-user",loginData,{headers:this.requestHeaders});
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this.httpClient.post(this.BASE_URL + "/authenticate", loginData, { headers, responseType: 'text' });
  }

  public roleEqual(allowRoles: any[]): boolean {
    const userRoles: any[] = this.userAuth.getRoles();
    let isMatch = false;

    if (userRoles && allowRoles) {
      for (const userRole of userRoles) {
        for (const allowedRole of allowRoles) {
          if (userRole.roleName === allowedRole) {
            isMatch = true;
            return isMatch; // Return true as soon as a match is found
          }
        }
      }
    }


    return isMatch;
  }


}
