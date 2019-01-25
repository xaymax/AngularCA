import { Component, OnInit } from '@angular/core';
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
  detail: string;
  details = [];
  jsonDetail: JSON;
  //#region People
  name: string;
  title: string;
  category = [];
  //#region relatedurl
  RelatedFilmurl: string;
  RelatedFilmurls = [];
  RelatedVehicleurl: string;
  RelatedVehicleurls = [];
  RelatedPeopleurl: string;
  RelatedPeopleurls = [];
  Relatedstarship: string;
  Relatedstarships = [];
  RelatedPlaneturl: string;
  RelatedPlaneturls = [];
  species: string;
  speciesurls = []
  //#endregion
  link = '';
  //#region linkarray
  filmlinks = [];
  starshiplinks=[];
  peoplelinks=[];
  planetlinks=[];
  vehiclelinks=[];
  specieslinks=[];
  //#endregion
  picnum = '';


  comments=[];
  localComments: string;
  tongtong: string;
  //#region  relatedlinkobjct
  filmobj: object;
  starshipobj:object;
  vehicleobj:object;
  planetobj:object;
  peopleobj:object;
  speciesobj:object;
  //#endregion
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
        console.log("JsonData >>>>>>>>>", data); //json


        this.keys = Object.keys(data);
        this.values = Object.values(data);
        // console.log("Keyssss>>>>>>>>>>>>[1]",this.keys);
        // console.log("Valuesss>>>>>>>>>>",this.values);

        this.name = this.values[0];

        this.picnum = this.itemId;
        this.Relatedstarships = this.keys[12];
        // console.log("Relatedstarships>>>>>>>>>>",this.Relatedstarships);

        for (let i = 0; i <= this.keys.length; i++) {

          if (typeof this.values[i] == 'string') {
            // 
            if (this.keys[i] == "created" || this.keys[i] == "edited" || this.keys[i] == "url" || this.keys[i] == "name" || this.keys[i] == "title") {

            }
            else {
              this.detail = this.keys[i] + ":" + this.values[i];
              this.details.push(this.detail);
            }

          }
          else {
            if (this.keys[i] == "films") {
              this.RelatedFilmurls = this.values[i];
              for (let i = 0; i < this.RelatedFilmurls.length; i++) {
                this.RelatedFilmurl = this.RelatedFilmurls[i];
                this.getRelatedUrl("films",this.RelatedFilmurl);
              }
            }
            if (this.keys[i] == "starships") {
              this.Relatedstarships = this.values[i];
              for (let i = 0; i < this.Relatedstarships.length; i++) {
                this.Relatedstarship = this.Relatedstarships[i];
                this.getRelatedUrl("starships",this.Relatedstarship);
              }
              
            }
            if (this.keys[i] == "vehicles") {
              this.RelatedVehicleurls = this.values[i];
              for (let i = 0; i < this.Relatedstarships.length; i++) {
                this.RelatedVehicleurl = this.RelatedVehicleurls[i];
                this.getRelatedUrl("vehicles",this.RelatedVehicleurl);
              }

            }
            if (this.keys[i] == "characters") {
              this.RelatedPeopleurls = this.values[i];
              for (let i = 0; i < this.RelatedPeopleurls.length; i++) {
                this.RelatedPeopleurl = this.RelatedPeopleurls[i];
                this.getRelatedUrl("characters",this.RelatedPeopleurl);
              }
            }
            if (this.keys[i] == "planets") {
              this.RelatedPlaneturls = this.values[i];
              for (let i = 0; i < this.RelatedPlaneturls.length; i++) {
                this.RelatedPlaneturl = this.RelatedPlaneturls[i];
                this.getRelatedUrl("planets",this.RelatedPlaneturl);
              }
            }
            if (this.keys[i] == "species") {
              this.speciesurls = this.values[i];
              for (let i = 0; i < this.speciesurls.length; i++) {
                this.species = this.speciesurls[i];
                this.getRelatedUrl("species",this.species);
              }
            }

          }

        }
        
        // console.log("films", this.RelatedFilmurls);
        // console.log("starships", this.Relatedstarships);
        // console.log("Array>>>>>>>>>", this.details); //Array //
        this.jsonDetail = JSON.parse(`{${this.details}}`);
        console.log("JsonDetail>>>>>>", this.jsonDetail); 
              
        //JSON object

      });
  }

     getRelatedUrl(tag,url){
      // console.log("species", this.speciesurl)
     this.starwarService.getRelatedUrls(url)
      .subscribe((data) => {
        this.title = data.title;
        // console.log("---------->", this.title)
        this.category = url.split('/');
        this.link = this.category[4] + "/" + this.category[5];
        // console.log("Category", this.category)
        // console.log("link", this.link)
        // console.log("tag",tag);

        if (tag=="films"){
          this.filmobj = { "filmname": this.title, "filmurl": this.link };
          this.filmlinks.push(this.filmobj);
          // console.log("filmlinks",this.filmlinks);
        }  
        
        if (tag=="starships"){
          this.starshipobj = {"startship":data.name,"startshipurl":this.link};
          this.starshiplinks.push(this.starshipobj);
          // console.log("starshiplinks",this.starshiplinks)
        }

        if (tag=="characters"){
          this.peopleobj = {"peoplename":data.name,"peopleurl":this.link};
          this.peoplelinks.push(this.peopleobj);
          // console.log("peoplelinks",this.peoplelinks)
        }
        if (tag=="species"){
          this.speciesobj = {"speciesname":data.name,"speciesurl":this.link};
          this.specieslinks.push(this.speciesobj);
          // console.log(this.specieslinks)
        }
        if (tag=="planets"){
          this.planetobj = {"planetname":data.name,"planeturl":this.link};
          this.planetlinks.push(this.planetobj);
          console.log(this.planetlinks)
        }

        if (tag=="vehicles"){
          this.vehicleobj = {"vehiclesname":data.name,"vehiclesurl":this.link};
          this.vehiclelinks.push(this.vehicleobj);
          // console.log(this.starshiplinks)
        }
      
        
      })
  }


  addComments(newComment: string) {
    console.log("0/0", newComment)
    if (newComment) {
      this.comments.push(newComment.toString());
    }

    localStorage.setItem(`${this.catName}${this.itemId}comments`, JSON.stringify(this.comments))
    console.log("0/0", localStorage)
  }

  loadComments() {
    
    this.localComments = localStorage.getItem(`${this.catName}${this.itemId}comments`);
    if (this.localComments == null){
      console.log("null comment?",this.loadComments)
      this.comments= [" "];
    }
    else{
      this.comments = JSON.parse(this.localComments);
      console.log("comments", this.comments)
    }
    
  }
  goBack() {
    this.location.back();
  }

  typeOf(value: any) {
    return typeof value;
  }
}
