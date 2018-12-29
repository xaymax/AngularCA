import { Component, OnInit } from '@angular/core';

import { StarwarService } from '../starwar.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList: Array<any> = [];
  categoryItem: string = '';

  constructor(
    private starwarService: StarwarService
  ) { }

  ngOnInit() {
    this.getCategoryList();
  }


  /* To load the whole category, and return the category list */
  getCategoryList(): void {
    this.starwarService.getCategoryList()
      .subscribe((data) => {
        this.categoryList = Object.keys(data);
        this.categoryList.forEach(element => {
          this.categoryItem = element;
          //console.log("categoryItem: " + this.categoryItem);
        });
        console.log('category Component: We got ' + this.categoryList);
      });
  }
}
