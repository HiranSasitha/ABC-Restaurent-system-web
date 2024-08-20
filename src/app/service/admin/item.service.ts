import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  BASE_URL = "http://localhost:8080/item";

  private requestHeaders = new HttpHeaders({
    'No-Auth': 'False',
    'Content-Type': 'application/json'

  });

  constructor(private httpClient:HttpClient,private userAuth:UserAuthService) { }

  public createItem(data:any){

    return this.httpClient.post<any>(this.BASE_URL+"/create",data);

  }
}
