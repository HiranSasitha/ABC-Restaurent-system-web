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

  public getAllActive(){

    return this.httpClient.get<any>(this.BASE_URL+"/get-all-active");

  }

  public createBranch(data:any){

    return this.httpClient.post<any>(this.BASE_URL+"/create",data);

  }

  updateItem(data: any, id:any) {
    return this.httpClient.put<any>(`${this.BASE_URL}/update/${id}`, data);

  }
}
