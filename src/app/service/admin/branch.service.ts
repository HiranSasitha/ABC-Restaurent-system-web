import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private httpClient:HttpClient,private userAuth:UserAuthService) { }


  BASE_URL = "http://localhost:8080/branch";

  private requestHeaders = new HttpHeaders({
    'No-Auth': 'False',
    'Content-Type': 'application/json'

  });

  public getAll(){

    return this.httpClient.get<any>(this.BASE_URL+"/get-all");

  }
}
