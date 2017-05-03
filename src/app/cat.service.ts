import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Cat } from './cat';
import { Sort } from './sort';

@Injectable()
export class CatService {
	
	private jsonUrl = 'app/cats.json';
  
  //private dbUri = ''; 
  
	constructor(
    private http: Http
  ) { }

	private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
	
	getFriends(id: number): Promise<Cat[]> {
		return this.http.get(this.jsonUrl)
               .toPromise()
               .then((response: Response) => {
                  let friends: any = [];
                  let data = response.json() && response.json().data;
                  data.forEach(function(item: any) {
                    if (item.id !== id) {
                      friends.push(item);                     
                    }                              
                  });
                  return friends as Cat[];
               })
               .catch(this.handleError);
	}
  
  getAllCats(sort: Sort): Promise<Cat[]> {
		return this.http.get(this.jsonUrl)
               .toPromise()
               .then((response: Response) => {
                  let data = response.json() && response.json().data;
                  data = this.sortData(data, sort);
                  return data as Cat[];
               })
               .catch(this.handleError);
	}

	getById(id: string): Promise<Cat> {           
    return this.http.get(this.jsonUrl)
			   .toPromise()
         .then((response: Response) => {
            let cat: Cat;
            let data = response.json() && response.json().data;
            data.forEach(function(item: any) {
              let end = true;
              if (item.id == id) {
                cat = item;
                end = false;                      
              }
              return end;                    
            });
            return cat as Cat;
         })
         .catch(this.handleError);
	}

  search(value: string, sort: Sort): Promise<Cat[]> {
    return this.http.get(this.jsonUrl)
               .toPromise()
               .then((response: Response) => {
                  let friends: any = [];
                  let data = response.json() && response.json().data;
                  data.forEach(function(item: any) {
                    let interests = item.interests;
                    let containsInterests = false;
                    if (interests.length > 0) {
                      interests.map(function(x: any) { 
                        if (x.indexOf(value) > -1) 
                          containsInterests = true;
                      });
                    }
                    if (item.name.indexOf(value) > -1 || 
                        item.birthDate.indexOf(value) > -1 ||
                        containsInterests) {
                      friends.push(item);                     
                    }                              
                  });
                  friends = this.sortData(friends, sort);
                  return friends as Cat[];
               })
               .catch(this.handleError); 
  }

  sortData(array: any[], sort: Sort): any[] {
    return array.sort(function(x, y) {
      switch(sort.column) {
        case "IsOnline":
          if (sort.descending)
            return (x.isOnline === y.isOnline) ? 0 : x.isOnline ? -1 : 1;
          else
            return (x.isOnline === y.isOnline) ? 0 : y.isOnline ? -1 : 1;
        case "Name":
          let nameX = x.name.toLowerCase(), nameY = y.name.toLowerCase();
          if (sort.descending)
            return (nameX < nameY) ? -1 : ((nameX > nameY) ? 1 : 0);
          else
            return (nameX > nameY) ? 0 : ((nameX < nameY) ? 1 : -1); 
        case "Birthdate":
            let birthDateX = x.birthDate != "" ? new Date(x.birthDate) : (sort.descending ? new Date(1970,0,1) : new Date()),
                birthDateY = y.birthDate != "" ? new Date(y.birthDate) : (sort.descending ? new Date(1970,0,1) : new Date());
            if (sort.descending)
              return (birthDateX < birthDateY) ? 1 : ((birthDateX > birthDateY) ? -1 : 0);                                                         
            else                                                        
              return (birthDateX > birthDateY) ? 1 : ((birthDateX < birthDateY) ? -1 : 0);              
      }                    
    });
  }
}