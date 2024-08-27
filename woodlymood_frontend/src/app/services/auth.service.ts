import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { User } from "../model/user";
import { Login } from "../model/login";
import { Observable } from 'rxjs';
import * as jwt_decode from 'jsonwebtoken';
import { tap } from 'rxjs/operators';
const AUTH_API = 'http://localhost:3000/auth/';

const httpOptions = {
  headers: new HttpHeaders({
  'Access-Control-Allow-Origin': '*', 
  'Content-Type': 'application/json' })
};
@Injectable({
  providedIn:'root'
})
export class AuthService{
  constructor(private http:HttpClient) {
  }
email:string='';
user={} as User;
  /*login(email: string, password: string): Promise<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(email + ':' + password),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const url = `${environment.apiBaseUrl}/user/signin`;

    return new Promise((resolve, reject) => {
      this.http.post<AuthResponse>(url, {}, { headers: headers })
        .subscribe({
          next: (responseData) => {
            if (responseData && responseData.access_token) {
              localStorage.setItem('accessToken', responseData.access_token);
              localStorage.setItem('refreshToken', responseData.refresh_token);
              resolve();
            } else {
              reject('No access token received');
            }
          },
          error: () => reject('Login failed. Please check your credentials.')
        });
    });
  }

  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
  }*/


  login(login:Login):Promise<void>{

    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(AUTH_API + 'login',login,httpOptions)
          .subscribe((res:any) => {

            let data = res.json;

            localStorage.setItem('token', res['token']);
            localStorage.setItem('email',login.email );
            resolve(data);

          }, (err) => {
            reject(err);
          });

    });

  }
  
  register(user: User): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup', user ,
      httpOptions 
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  getToken(): boolean {
     const t=localStorage.getItem('token');
     if(t) {return true;}
     else{return false;}
  }

 

  isLoggedIn(): boolean {
    const token = this.getToken();
    if(token){return true;}
    else{return false;}}
  getEmail(): any{
    return localStorage.getItem('email');
  }

  getUser(email:any): Observable<User> {
    return this.http.get<User>(`${AUTH_API}${email}`,httpOptions);
  }
  getUserById(id:string): Observable<any> {
    return this.http.get(`${AUTH_API}user/${id}`,httpOptions);
  }

  updateUser(id:string,nom:string,prenom:string,numtel:string, email:string, addresse:string,ville:string,codepostale:string): Observable<any> {
    return this.http.put(
      `${AUTH_API}update`,{ id,nom,prenom,numtel, email, addresse,ville,codepostale} ,
      httpOptions 
    );
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user);
    return user && user.role === 'admin';
  }


}
