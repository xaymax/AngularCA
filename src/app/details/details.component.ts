import { Component, OnInit, IterableDiffers } from '@angular/core';
import { StarwarService } from '../starwar.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { catchError, map, tap, subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  itemName = this.route.snapshot.paramMap.get('itemName');
  itemUrl: string = '';
  keys: Array<any> = [];
  key: string = '';
  values: Array<any> = [];
  value: any;
  details = [];
  detail: string = '';

  constructor(
    private route: ActivatedRoute,
    private starwarService: StarwarService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDetailsOfItem();
  }

  /* To load details of the selected item */
  getDetailsOfItem() {
    // console.log('Get into details component getDetailsOfItem() function');
    return this.starwarService.getDetailsOfItem(this.itemName)
      .subscribe((data) => {
        console.log(data); //json
        console.log(typeof data);//object

        this.keys = Object.keys(data);
        this.values = Object.values(data);
        console.log(this.keys);
        console.log(this.values);

        this.keys.forEach(element => {
          this.key = element;
          // console.log(this.key);
        });

        this.values.forEach(element => {
          this.value = element;
          // console.log(this.value);
        });

        for (let i = 1; i <= this.keys.length; i++) {
          this.detail = this.keys[i] + ": " + this.values[i];
          this.details.push(this.detail);
        }
      });
  }

}
