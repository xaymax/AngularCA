import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location, KeyValue } from '@angular/common';

import { StarwarService } from '../starwar.service';

import { PageNavComponent } from '../page-nav/page-nav.component';


@Component({
  selector: 'app-items-in-category',
  templateUrl: './items-in-category.component.html',
  styleUrls: ['./items-in-category.component.css']
})
export class ItemsInCategoryComponent implements OnInit {

  @Input() pageNum: string;
  page = this.route.queryParams.subscribe((params: Params) => {
    this.pageNum = params['page'];
  });
  items = [];
  catName = this.route.snapshot.paramMap.get('catName');
  itemId: string = '';

  @ViewChild(PageNavComponent)
  PageNavComponent: PageNavComponent

  constructor(
    private route: ActivatedRoute,
    private starwarService: StarwarService,
    private location: Location) {
  }

  ngOnInit(): void {
    console.log("items component ngOnInit");
    this.showItemsInCategory();
    // console.log("items component onInit get the child current page: " + this.PageNavComponent.currentPage);
  }

  ngOnChanges() {
    console.log("items component ngOnChanges");
    this.pageNum = this.PageNavComponent.currentPage;
    this.showItemsInCategory();
    
  }


  /* To load all items in the selected category */
  showItemsInCategory() {
    //console.log('Get into items-in-category component getItemsInCategory() function');
    return this.starwarService.getItemsInCategory(this.catName, this.pageNum)
      .subscribe((data) => {
        // console.log(data.results);
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

  changePage() {
    this.ngOnChanges();
    console.log('click on pagenav component selector, already changed pageNum to ' + this.pageNum);
  }
  goBack(){
    history.go(-1);
  }
}
