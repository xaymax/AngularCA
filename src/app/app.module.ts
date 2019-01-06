import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './details/details.component';
import { ItemsInCategoryComponent } from './items-in-category/items-in-category.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemsComponent } from './items/items.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ItemsInCategoryComponent,
    DetailsComponent,
    PageNotFoundComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
