import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private Authenticated:Boolean;
  constructor(private http:HttpClient) { }

  authenticate(user){
    this.Authenticated =true;
    return this.http.post("http://127.0.0.1:8000/api/users",user);

  }


  signup(user){
    return this.http.post('http://127.0.0.1:8000/test/',user);
  }

  isAuthenticated(){
    return this.Authenticated;
  }




}
