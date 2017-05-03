import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Cat } from './cat';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  public token: string;
  
  private jsonUrl = 'app/cats.json';
  
  constructor(
    private http: Http,
    private router: Router) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
    }
  
  login(username: string, password: string): Observable<boolean> {
    return this.http.get(this.jsonUrl)
               .map((response: Response) => {
                  let cat: Cat;
                  let data = response.json() && response.json().data;
                  let token = response.json() && response.json().token;
                  data.forEach(function(item: any) {
                    let end = true;
                    if (item.username === username && item.password === password && token) {
                      cat = item;
                      end = false;                      
                    }
                    return end;                    
                  });
                  if (cat) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    this.router.navigate(['/cat', cat.id]);
                    return true;
                  } else {
                    return false;
                  } 
               });
  }

    logout(): void {        
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}