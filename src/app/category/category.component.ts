import { Component, OnInit } from '@angular/core';

import { Category } from '../category';
import { StarwarService } from '../starwar.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList=[];

  constructor(
    private starwarService: StarwarService
  ) { }

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList(): void {
    this.starwarService.getCategoryList()
      .subscribe(categoryList => {this.categoryList = categoryList;
      console.log('category Componet: We got'+categoryList);});
  }

  
}
