import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;
  private serverURL = 'http://localhost:3004/';
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<boolean> {
    this.user = null;
    this.isAuthenticatedSubject.next(false);
    const url = `${this.serverURL}users`;
    return this.http.get(url).pipe(
      map((users: Array<User>) => {
        const user = users.find((item) => {
          return item.login === login && item.password === password; 
        });
        if (user) {
          this.user = user;
          localStorage.setItem('token', this.user.fakeToken);
          this.isAuthenticatedSubject.next(true);
          return true;
        } else {
          this.isAuthenticatedSubject.next(false);
          return false;
        }
      })
    )
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> { 
    if ( !this.isAuthenticatedSubject.value && localStorage.getItem('token')) {
      const url = `${this.serverURL}users`;
      return this.http.get(url).pipe(
        map((users: Array<User>) => {
        const user = users.find((item) => {
          return item.fakeToken === localStorage.getItem('token') ; 
        });
        if (user) {
          this.user = user;
          this.isAuthenticatedSubject.next(true);
          return true;
        } else {
          this.isAuthenticatedSubject.next(false);
          return false;
        }
      }))
    } 

    return this.isAuthenticatedSubject;
  }

  getUserInfo() {
    return this.user;
  }

}
