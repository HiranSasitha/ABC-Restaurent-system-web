import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  BASE_URL = "http://localhost:8080/category";

  private requestHeaders = new HttpHeaders({
    'No-Auth': 'False',
    'Content-Type': 'application/json'

  });

  constructor(private httpClient:HttpClient,private userAuth:UserAuthService) { }

  public createCategory(data:any){


    return this.httpClient.post<any>(this.BASE_URL+"/create",data);
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this.httpClient.post(this.BASE_URL + "/authenticate", loginData, { headers, responseType: 'text' });
  }
}
