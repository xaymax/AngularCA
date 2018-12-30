import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location, KeyValue } from '@angular/common';

import { StarwarService } from '../starwar.service';


@Component({
  selector: 'app-items-in-category',
  templateUrl: './items-in-category.component.html',
  styleUrls: ['./items-in-category.component.css']
})
export class ItemsInCategoryComponent implements OnInit {
  pageSize: number;
  pages=[];
  pageNum: string;
  page = this.route.queryParams.subscribe((params: Params) => {
    this.pageNum = params['page'];
  });
  items = [];
  catName = this.route.snapshot.paramMap.get('catName');
  itemId: string = '';

  constructor(
    private route: ActivatedRoute,
    private starwarService: StarwarService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.showItemsInCategory();
    this.getPageTotalNum(this.catName);
  }

  /* To load all items in the selected category */
  showItemsInCategory() {

    //console.log('Get into items-in-category component getItemsInCategory() function');
    return this.starwarService.getItemsInCategory(this.catName, this.pageNum)
      .subscribe((data) => {
        console.log(data.results);
        this.items = data.results;
        // for (var i = 1; i <= data.length; i++) {
        //   let Vid: string = "";
        //   var idKV: { [key: string]: string } = { "id": Vid };
        //   this.items.push(idKV);
        // }
      });
  }

  getItemIdFromCurrentPageNum(itemApiUrl: string) {
    return this.itemId = this.starwarService.getItemIdFromApiUrl(itemApiUrl);
  }

  getPageTotalNum(catName: string) {
    return +this.starwarService.getPageSize(catName)
      .subscribe((data) => {
        let division = data.count / 10;
        this.pageSize=Math.ceil(division);
        for(var i=1;i<=this.pageSize;i++){
          this.pages.push(i);
        }
      })
  }
}
