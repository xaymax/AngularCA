import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StarwarService } from '../starwar.service';

// import{Comment} from '../Comments';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

// @Input() comment:Comment

  itemId = this.route.snapshot.paramMap.get('itemId');
  catName = this.route.snapshot.paramMap.get('catName');

  itemUrl: string = '';
  keys: Array<any> = [];
  key: string = '';
  values: Array<any> = [];
  value: any;
  detail:string;
  details = [];
  jsonDetail: JSON;
  //#region People
  name:string;
  title:string;
  category=[];
  RelatedFilmurl:string;
  RelatedFilmurls =[];
  link='';
  links=[];
  picnum='';
  filmobj: object;
  starships: string;
  comments=[];
  localComments:string;
  tongtong:string;
  //#endregion

  

  constructor(
    private route: ActivatedRoute,
    private starwarService: StarwarService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.showDetailsOfItem();
    this.loadComments();

  }

  /* To load details of the selected item */
  showDetailsOfItem() {

    return this.starwarService.getDetailsOfItem(this.catName, this.itemId)
      .subscribe((data) => {
        // console.log("JsonData >>>>>>>>>",data); //json


        this.keys = Object.keys(data);
        this.values = Object.values(data);
        // console.log("Keyssss>>>>>>>>>>>>[1]",this.keys);
        // console.log("Valuesss>>>>>>>>>>",this.values);

        this.name=this.values[0];
      
        this.picnum = this.itemId;

        for (let i = 0; i <= this.keys.length; i++) {

          if (typeof this.values[i] == 'string'){

            if (this.keys[i]=="created" ||this.keys[i]=="edited" ||this.keys[i]=="url"||this.keys[i]=="name"||this.keys[i]=="title" ){

            }
            else{
              this.detail = this.keys[i]+":"+this.values[i];
              this.details.push(this.detail);
            }           
           
          }
          
          if (this.keys[i] =="films" ){
            
            this.RelatedFilmurls = this.values[i];
           
            for (let i=0; i< this.RelatedFilmurls.length;i++){
              this.RelatedFilmurl = this.RelatedFilmurls[i];
        
              this.getRelatedFilm(this.RelatedFilmurl);              
            }

            if (this.key[i]=="starships"){

            }

          }
         
        }
        console.log("Array>>>>>>>>>",this.details); //Array //
        this.jsonDetail = JSON.parse(`{${this.details}}`);
        console.log("JsonDetail>>>>>>",this.jsonDetail); //JSON object
        
        
        
      });
  }
  
  getRelatedFilm(url){
    this.starwarService.getRelatedFilms(url)
    .subscribe((data)=>{
        this.title = data.title;
        console.log("---------->",this.title)
        this.category = url.split('/');

        this.link = this.category[4]+"/"+this.category[5];
        console.log("Category",this.category)
        console.log("Category",this.link)
        this.filmobj={ "filmname":this.title, "filmurl":this.link};
        this.links.push(this.filmobj);
        
    })
  }

  getStarships(url){

  }

  addComments(newComment:string){
    if(newComment){
      this.comments.push(newComment);
    }

      localStorage.setItem(`${this.catName}${this.itemId}comments`,JSON.stringify(this.comments)) 
      console.log("0/0",localStorage)
  }

  loadComments(){

    this.localComments=localStorage.getItem(`${this.catName}${this.itemId}comments`);
    this.comments= JSON.parse(this.localComments);
    console.log("comments",this.comments)    
  }
  goBack() {
    this.location.back();
  }

  typeOf(value: any) {
    return typeof value;
  }
}
