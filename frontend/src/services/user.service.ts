import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  listUsers(){
    return this.http.get('http://127.0.0.1:8000/api/users');
  }
  deleteUsers(user){
    return this.http.delete("http://127.0.0.1:8000/api/users/"+user);
  }

  updateUsers(user){
    return this.http.put("http://127.0.0.1:8000/api/users/"+user.id,user);
  }
  addUsers(user){
    return this.http.post("http://127.0.0.1:8000/api/users",user);
  }





}
