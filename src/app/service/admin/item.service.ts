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

  public updateItem(data:any,id:any){

    return this.httpClient.put<any>(`${this.BASE_URL}/update/${id}`, data);

  }

  public getAll(){

    return this.httpClient.get<any>(this.BASE_URL+"/get-all");

  }

  getAllBranchByItem(id:any) {
    const url = `${this.BASE_URL}/get-all-branch-by-item/${id}`;

    return this.httpClient.get<any>(url);
  }

  getAllItemByBranch(id:any) {
    const url = `${this.BASE_URL}/get-all-item-by-branch/${id}`;

    return this.httpClient.get<any>(url);
  }

  getAllItemByBranchByItemByCategory(id:any,catId:any) {
    const url = `${this.BASE_URL}/get-all-branch-by-item-by-category/${id}/${catId}`;

    return this.httpClient.get<any>(url);
  }

  updateBranchByItemStatus(branchId:any,itemId:any,isActive:boolean) {
    const url = `${this.BASE_URL}/update-branch-item-status/${branchId}/${itemId}/${isActive}`;

    return this.httpClient.put<any>(url,"");
  }
}
