import { Component, OnInit, Input } from '@angular/core';
import { StarwarService } from '../starwar.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-items-in-category',
  templateUrl: './items-in-category.component.html',
  styleUrls: ['./items-in-category.component.css']
})
export class ItemsInCategoryComponent implements OnInit {

  // @Input() catName: string;
  items = [];
  public itemApiUrl:string='';
  // id:string='';
  catName = this.route.snapshot.paramMap.get('catName');

  constructor(
    private route: ActivatedRoute,
    private starwarService: StarwarService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.getItemsInCategory();
  }

  // getItemsInCategory(): Promise<any> {
  //   console.log('Get into items-in-category component getItems(catName) function');
  //   const catName = this.route.snapshot.paramMap.get('catName');
  //   return this.starwarService.getItems(catName)
  //     .toPromise()
  //     //.then(this.extractData)
  //     .then((data) => this.items = JSON.parse(data))//{this.items=this.extractData; })
  //     .catch(this.starwarService.handleError<any>(`getItems name=${catName}`));;
  //   // .subscribe(items => this.items = items);
  //   //this.starwarService.getItems(categoryName).subscribe(item=>this.items=item);
  // }

  // private extractData(res: Response) {
  //   let items = res.json;
  //   return items || [];
  // }

  getItemsInCategory() {
    console.log('Get into items-in-category component getItemsInCategory() function');

    return this.starwarService.getItems(this.catName)
      .subscribe((data) => {
        console.log(data.results);
        this.items = data.results;
        // this.id=this.getItemId();
      });
  }

  // getItemId():string{
	// 	var index = this.itemUrl.lastIndexOf("\/");
  //   var id = decodeURI(this.itemUrl.substring(index + 1, this.itemUrl.length));
  //   return id;
  // }

  //********(click) action */
  getApiUrl(itemApiUrl:string){
    console.log("items-in-category component:"+itemApiUrl)
    this.starwarService.getApiUrl(itemApiUrl);
  }
}
