import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { catchError, map, tap, subscribeOn } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class StarwarService {

  public baseUrl = 'https://swapi.co/api';
  public itemApiUrl: string = '';

  constructor(
    private http: HttpClient
  ) { }

  getCategoryList() {
    return this.http.get<String>(`${this.baseUrl}/`)
      .pipe(
        tap(_ => console.log(`SERVICE: fetch category list, and the url is: ${this.baseUrl}/`)),
        catchError(this.handleError<any>(`getCategoryList() in service has problems~`))
      )
  }

  getItems(catName: string) {
    const itemsInCategoryUrl = `${this.baseUrl}/${catName}/`;
    return this.http.get<any>(itemsInCategoryUrl)
      .pipe(
        tap(_ => console.log(`SERVICE: fetch selected category: ${catName} and its items, and itemsInCategoryUrl is ${itemsInCategoryUrl}`)),
        catchError(this.handleError<any>(`getItems(${catName}) in service has problems~`))
      );
  };

  getItemApiUrl(itemApiUrl: string) {
    this.itemApiUrl = itemApiUrl;
    // console.log(this.itemApiUrl);
  }

  getDetailsOfItem(itemName: string) {
    // console.log(itemName);
    const detailOfItemUrl = this.itemApiUrl;
    // console.log(this.itemApiUrl);
    return this.http.get<any>(detailOfItemUrl)
      .pipe(
        tap(_ => console.log(`SERVICE: fetch selected item: ${itemName} details, detailOfItemUrl is ${detailOfItemUrl}`)),
        catchError(this.handleError<any>(`getDetailsOfItem(${itemName}) in service has problems`))
      );
  };


  /* Handle Error */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
