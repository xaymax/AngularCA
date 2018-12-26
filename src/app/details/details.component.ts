import { Component, OnInit, IterableDiffers } from '@angular/core';
import { StarwarService } from '../starwar.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, observable } from 'rxjs';
import { catchError, map, tap, subscribeOn } from 'rxjs/operators';
import { stringify } from '@angular/core/src/render3/util';
import { element } from 'protractor';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  details = [];
  detail:string='';
  itemName = this.route.snapshot.paramMap.get('itemName');
  itemUrl: string = '';
  keys: Array<any>=[];
  key:string='';
  values:Array<any>=[];
  value:any;

  constructor(
    private route: ActivatedRoute,
    private starwarService: StarwarService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDetailsOfItem();
  }

  getDetailsOfItem() {
    console.log('Get into details component getDetailsOfItem() function');
    return this.starwarService.getDetailsOfItem(this.itemName)
      // .map((res: Response) => res.json())
      .subscribe((data) => {
        console.log(data); //json object
        console.log(typeof data);//object
        this.keys = Object.keys(data);
        this.values=Object.values(data);
        
        console.log(this.keys);
        console.log("typeof keys"+typeof this.keys);

        console.log(this.values);
        console.log("typeof keys"+typeof this.values);

        this.keys.forEach(element => {
          this.key=element;
          console.log(this.key);
          // this.details.push(this.key);
        });

        this.values.forEach(element => {
          this.value=element;
          console.log(this.value);
          // this.details.push(this.value);
        });
        
        console.log(this.keys.length);
        for (let i = 1;i<=this.keys.length;i++) {
          this.detail=this.keys[i]+": "+this.values[i];
          this.details.push(this.detail);
        }
        //this.details = data//JSON.stringify(data);//............error here
      });
  }

}
