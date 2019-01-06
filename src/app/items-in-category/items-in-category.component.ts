import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { StarwarService } from '../starwar.service';

@Component({
  selector: 'app-items-in-category',
  templateUrl: './items-in-category.component.html',
  styleUrls: ['./items-in-category.component.css']
})
export class ItemsInCategoryComponent implements OnInit {

  /* ------------------------------------------ */
  /*                  PROPERTIES                */
  /* ------------------------------------------ */
  @Input() pageNum: string;
  @Input() items: object[]; // = [];
  catName = this.route.snapshot.paramMap.get('catName');
  itemId: string = '';


  /* ------------------------------------------ */
  /*           CONSTRUCTOR & LIFECYCLE          */
  /* ------------------------------------------ */
  constructor(
    private route: ActivatedRoute,
    private starwarService: StarwarService
  ) { }

  ngOnInit(): void {
    console.log("items in cat component ngOnInit");
  }



  /* ------------------------------------------ */
  /*                EVENT ACTIONS               */
  /* ------------------------------------------ */
  /* (click) action: when select item */
  getItemIdFromCurrentPageNum(itemApiUrl: string) {
    return this.itemId = this.starwarService.getItemIdFromApiUrl(itemApiUrl);
  }
}
