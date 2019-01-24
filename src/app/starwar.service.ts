import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { catchError, map, tap, subscribeOn, toArray } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}

@Injectable({
  providedIn: 'root'
})
export class StarwarService {

  /* ------------------------------------------ */
  /*                  PROPERTIES                */
  /* ------------------------------------------ */
  public baseUrl = 'https://swapi.co/api';
  public itemApiUrl: string = '';//in case to use
  public itemId: string = '';

  /* ------------------------------------------ */
  /*                  CONSTRUCTOR               */
  /* ------------------------------------------ */
  constructor(
    private http: HttpClient,
  ) { }


  /* ------------------------------------------ */
  /************** CategoryComponent *************/
  /* ------------------------------------------ */
  getCategoryList() {
    return this.http.get<String>(`${this.baseUrl}/`)
      .pipe(
        tap(_ => console.log(`SERVICE: fetch category list, and the url is: ${this.baseUrl}/`)),
        catchError(this.handleError<any>(`getCategoryList() in service has problems~`))
      )
  }

  /* ------------------------------------------ */
  /****** Items & ItemsInCategoryComponent ******/
  /* ------------------------------------------ */

  getItemsInCategory(catName: string, pageNum: string) {
    let itemsInCategoryUrl = `${this.baseUrl}/${catName}/?page=${pageNum}`;
    console.log('itemsInCategoryUrl service:' + itemsInCategoryUrl);
    return this.http.get<any>(itemsInCategoryUrl)
      // .pipe(
      //   tap(_ => console.log(`SERVICE: fetch selected category: ${catName} and its items, and itemsInCategoryUrl is ${itemsInCategoryUrl}`)),
      //   catchError(this.handleError<any>(`getItemsInCategory(${catName}, ${pageNum}) in service has problems~`))
      // );
      .toPromise();
  };

  /* to get item's itemId from API URL*/
  getItemIdFromApiUrl(itemApiUrl: string): string {
    this.itemApiUrl = itemApiUrl;
    let arrUrlSplit = itemApiUrl.split('/');
    var id = arrUrlSplit[arrUrlSplit.length - 2];
    return this.itemId = id;
  }

  /* ------------------------------------------ */
  /************** DetailsComponent **************/
  /* ------------------------------------------ */

  getDetailsOfItem(catName: string, itemId: string) {
    let detailOfItemUrl = `${this.baseUrl}/${catName}/${itemId}`;

    return this.http.get<any>(detailOfItemUrl)
      .pipe(
        tap(_ => console.log(`SERVICE: fetch selected item: ${itemId} details, detailOfItemUrl is ${detailOfItemUrl}`)),
        catchError(this.handleError<any>(`getDetailsOfItem(${catName}, ${itemId}) in service has problems`))
      );
  };

  getRelatedFilms(relatedFilmUrl: string) {
 

    return this.http.get<any>(relatedFilmUrl)
      .pipe(
        tap(_ => console.log()),
        catchError(this.handleError<any>())
      );
  };





  /* ------------------------------------------ */
  /*                 Handle Error               */
  /* ------------------------------------------ */

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
