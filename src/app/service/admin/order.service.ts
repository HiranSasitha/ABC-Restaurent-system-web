import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient,private userAuth:UserAuthService) { }


  BASE_URL = "http://localhost:8080/order";

  private requestHeaders = new HttpHeaders({
    'No-Auth': 'False',
    'Content-Type': 'application/json'

  });

  getAllOrderStatus() {
    const url = `${this.BASE_URL}/get-all-order-status`;

    return this.httpClient.get<any>(url);
  }

  updateOrderStatus(id:any,isActive:boolean) {
    const url = `${this.BASE_URL}/update-order-status/${id}/${isActive}`;

    return this.httpClient.put<any>(url,"");
  }

  placeOrder(data:any) {
    return this.httpClient.post<any>(`${this.BASE_URL}/create`,data);
  }

  getAvailableSeat(branchId:number) {
    const url = `${this.BASE_URL}/get-available-seat/${branchId}`;

    return this.httpClient.get<any>(url);
  }

  getAllOrderByUser(userName:string) {
    const url = `${this.BASE_URL}/get-orders-by-user/${userName}`;

    return this.httpClient.get<any>(url);
  }
}
