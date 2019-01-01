import { Component, OnInit, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { StarwarService } from '../starwar.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {

  /* ------------------------------------------ */
  /*                  PROPERTIES                */
  /* ------------------------------------------ */
  items: object[] = [];
  pages = [];
  pageSize: number;
  catName = this.route.snapshot.paramMap.get('catName');
  currentPage = this.route.snapshot.queryParamMap.get('page');
  prePage: string;
  nextPage: string;

  navigationSubscription;

  /* ------------------------------------------ */
  /*           CONSTRUCTOR & LIFECYCLE          */
  /* ------------------------------------------ */
  constructor(
    private route: ActivatedRoute,
    private starwarService: StarwarService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPageSize();
    this.getPageInfo();
    this.showItemsInCategory();
  }

  ngOnDestroy(): void {
    // destory navigationSubscription, avoid Memory Leak
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }


  /* ------------------------------------------ */
  /*                   LOAD INFO                */
  /* ------------------------------------------ */

  getPageInfo() {
    this.getPrePage();
    this.getNextPage();
  }

  getPageSize() {
    +this.starwarService.getItemsInCategory(this.catName, this.currentPage)
      .then((data) => {
        let division = data.count / 10;
        this.pageSize = Math.ceil(division);
        for (var i = 1; i <= this.pageSize; i++) {
          this.pages.push(i);
        }
      });
  }

  getPrePage() {
    this.starwarService.getItemsInCategory(this.catName, this.currentPage)
      .then((data) => {
        if (data.previous) {
          let params = data.previous.toString().split('=');
          this.prePage = params[1];
        }
        else { this.prePage = this.currentPage; }
        console.log("prePage: " + this.prePage);
      })
  }

  getNextPage() {
    this.starwarService.getItemsInCategory(this.catName, this.currentPage)
      .then((data) => {
        if (data.next) {
          let params = data.next.toString().split('=');
          this.nextPage = params[1];
        }
        else { this.nextPage = this.currentPage; }
        console.log("nextpage: " + this.nextPage);
      })
  }



  /* ------------------------------------------ */
  /*                   METHOD                   */
  /* ------------------------------------------ */

  /* To load all items in the selected category */
  showItemsInCategory() {
    return this.starwarService.getItemsInCategory(this.catName, this.currentPage)
      // .subscribe((data) => {
      //   // console.log(data.results);
      //   this.items = data.results;
      // });
      .then((data) => this.items = data.results)
      .catch(error => console.log(error));
  }



  /* ------------------------------------------ */
  /*                EVENT ACTIONS               */
  /* ------------------------------------------ */

  /* (click) action: when select different page */
  changeCurrentPage(pageNum: string) {
    this.currentPage = pageNum;
    this.showItemsInCategory();
    this.getPageInfo();
  }

  /* (click) action: when click 'Back' button */
  goBack() {
    this.location.back();
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        console.log(event);
        this.currentPage = event.url.toString().split('=')[1];
        if (this.currentPage) {
          this.showItemsInCategory();
        }
      }
    });
  }


}




