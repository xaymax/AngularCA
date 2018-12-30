import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StarwarService } from '../starwar.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.css']
})
export class PageNavComponent implements OnInit {

  pages = [];
  pageSize: number;
  catName = this.route.snapshot.paramMap.get('catName');
  currentPage = this.route.snapshot.queryParamMap.get('page');
  // .subscribe(params => {
  //   this.currentPage = params.value;
  // })
  prePage: string;
  nextPage: string;


  @Output() changePageClick: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private starwarService: StarwarService
  ) { }

  ngOnInit() {
    this.getPageSize();
    this.getPageInfo();
  }


  getPageInfo() {
    this.getPrePage();
    this.getNextPage();
  }

  getPageSize() {
    return +this.starwarService.getItemsInCategory(this.catName, this.currentPage)
      .subscribe((data) => {
        let division = data.count / 10;
        this.pageSize = Math.ceil(division);
        for (var i = 1; i <= this.pageSize; i++) {
          this.pages.push(i);
        }
      })
  }

  changeCurrentPage(pageNum: string) {
    // console.log('before: ' + this.currentPage);
    this.currentPage = pageNum;
    // console.log('after: ' + this.currentPage);
    this.getPageInfo();
    this.changePageClick.emit(this.currentPage);
  }

  getPrePage() {
    this.starwarService.getItemsInCategory(this.catName, this.currentPage)
      .subscribe((data) => {
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
      .subscribe((data) => {
        if (data.next) {
          let params = data.next.toString().split('=');
          this.nextPage = params[1];
        }
        else { this.nextPage = this.currentPage; }
        console.log("nextpage: " + this.nextPage);
      })
  }



}




