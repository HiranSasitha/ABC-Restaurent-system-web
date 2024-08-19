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

  }

  public updateCategory(data:any,id:number){

    return this.httpClient.put<any>(`${this.BASE_URL}/update/${id}`, data);

  }

  public getAll(){

    return this.httpClient.get<any>(this.BASE_URL+"/get-all");

  }
}
