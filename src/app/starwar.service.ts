import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable, of, from } from 'rxjs';
import { catchError, map, tap, subscribeOn } from 'rxjs/operators';

import { Category } from './category';
import { CATEGORYLIST } from './categoryList';
import { pipe } from '@angular/core/src/render3/pipe';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class StarwarService {

  public baseUrl = 'https://swapi.co/api';
  private CatName: string = '';
  private itemName: string = '';
  public itemApiUrl:string = '';

  constructor(
    private http: HttpClient
  ) { }

  getCategoryList(): Observable<Category[]> {
    return of(CATEGORYLIST)
  }

  /** GET ItemsInCategory by catName. Will 404 if id not found */

  // getItems(categoryName: string): Observable<any>{ //Promise<any> {
  //   const itemsInCategoryUrl = `${this.baseUrl}/${categoryName}`;
  //   return this.http.get(itemsInCategoryUrl);
  //     .toPromise()
  //     .then(item=>this.item)
  //     ;
  // }
  getItems(catName: string) {
    const _itemsInCategoryUrl = `${this.baseUrl}/${catName}/`;
    // this.CatName = catName;
    // this.http.get<Iitems>(itemsInCategoryUrl).subscribe(data=>{console.log("We got", data.obj)});
    return this.http.get<any>(_itemsInCategoryUrl)
      .pipe(
        tap(_ => console.log(`fetch category name = ${catName}, and itemsInCategoryUrl is ${_itemsInCategoryUrl}`)),
        catchError(this.handleError<any>(`getItems(), category name=${catName}`))
      );
  };

  getApiUrl(itemApiUrl:string){
    this.itemApiUrl=itemApiUrl;
    console.log(this.itemApiUrl);
  }

  getDetailsOfItem(itemName: string) {
    console.log(itemName);
    // const detailOfItemUrl = `${this.baseUrl}/${this.CatName}/${id}/`;
    const detailOfItemUrl=this.itemApiUrl;

    console.log(this.itemApiUrl);
    return this.http.get<any>(detailOfItemUrl)
      .pipe(
        tap(_ => console.log(`fetch detailOfItemUrl is ${detailOfItemUrl}`)),
        catchError(this.handleError<any>(`getDetailsOfItem(), item name=${itemName}`))
      );
  };



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
