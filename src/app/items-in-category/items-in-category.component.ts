import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StarwarService } from '../starwar.service';

@Component({
  selector: 'app-items-in-category',
  templateUrl: './items-in-category.component.html',
  styleUrls: ['./items-in-category.component.css']
})
export class ItemsInCategoryComponent implements OnInit {

  items = [];
  itemApiUrl: string = '';
  catName = this.route.snapshot.paramMap.get('catName');

  constructor(
    private route: ActivatedRoute,
    private starwarService: StarwarService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.getItemsInCategory();
  }

  /* To load all items in the selected category */
  getItemsInCategory() {
    //console.log('Get into items-in-category component getItemsInCategory() function');
    return this.starwarService.getItems(this.catName)
      .subscribe((data) => {
        // console.log(data.results);
        this.items = data.results;
      });
  }

  /* (click) action, to get the selected item details API url*/
  getItemApiUrl(itemApiUrl: string) {
    // console.log("items-in-category component, itemApiUrl: " + itemApiUrl);
    this.starwarService.getItemApiUrl(itemApiUrl);
  }
}
