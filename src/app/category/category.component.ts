import { Component, OnInit, Input } from '@angular/core';

import { StarwarService } from '../starwar.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList: Array<any> = [];
  categoryItem: string = '';
  categoryApiList: Array<any> = [];
  categories = {};
  page: number = 1;

  constructor(
    private starwarService: StarwarService
  ) { }

  ngOnInit() {
    this.showCategoryList();
  }


  /* To load the whole category, and return the category list */
  showCategoryList(): void {
    this.starwarService.getCategoryList()
      .subscribe((data) => {
        // this.categoryList = Object.keys(data);
        // this.categoryApiList = Object.values(data);
        // this.categoryList.forEach(element => {
        // this.categoryItem = element;
        //console.log("categoryItem: " + this.categoryItem);
        // });
        // console.log(`category Component: We got ${this.categoryList}, and APIs ${this.categoryApiList}`);

        this.categories = data;
      });

  }

}
