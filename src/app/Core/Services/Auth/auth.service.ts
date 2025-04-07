import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iregister } from '../../Interfaces/iregister';
import { baseUrl } from '../../Environment/Environment';
import { Observable } from 'rxjs';
import { Ilogin } from '../../Interfaces/ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient:HttpClient) { }

  PostRegister(data:Iregister):Observable<any>
  {
  return  this.httpClient.post(`${baseUrl}/users/signup`, data)
  }
  PostLogin(data:Ilogin):Observable<any>
  {
  return  this.httpClient.post(`${baseUrl}/users/signin`, data)
  }
}
