import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StarwarService } from '../starwar.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  itemId = this.route.snapshot.paramMap.get('itemId');
  catName = this.route.snapshot.paramMap.get('catName');

  itemUrl: string = '';
  keys: Array<any> = [];
  key: string = '';
  values: Array<any> = [];
  value: any;
  details = [];
  detail: string = '';
  jsonDetail: JSON;

  constructor(
    private route: ActivatedRoute,
    private starwarService: StarwarService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.showDetailsOfItem();
  }

  /* To load details of the selected item */
  showDetailsOfItem() {
    // console.log('Get into details component getDetailsOfItem() function');
    return this.starwarService.getDetailsOfItem(this.catName, this.itemId)
      .subscribe((data) => {
        console.log(data); //json
        // console.log(typeof data);//object

        this.keys = Object.keys(data);
        this.values = Object.values(data);
        console.log(this.keys);
        console.log(this.values);

        // this.keys.forEach(element => {
        //   this.key = element;
        // });
        // this.values.forEach(element => {
        //   this.value = element;
        // });

        for (let i = 1; i <= this.keys.length; i++) {
          // this.detail = this.keys[i] + this.values[i];
          this.detail = "\"" + this.keys[i] + "\"" + ":" + "\"" + this.values[i] + "\"";
          this.details.push(this.detail);

        }
        console.log(this.details); //Array
        this.jsonDetail = JSON.parse(`{${this.details}}`);
        console.log(this.jsonDetail); //JSON object

      });
  }

  goBack() {
    this.location.back();
  }

  typeOf(value: any) {
    return typeof value;
  }
}
