import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { ItemsInCategoryComponent } from './items-in-category/items-in-category.component';
import { DetailsComponent } from './details/details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent, },
  { path: 'category/:catName', component: ItemsInCategoryComponent },
  { path: 'category/:catName/:itemName', component: DetailsComponent },
  // { path: '**', component: PageNotFoundComponent,pathMatch:'prefix' },
  { path: '', redirectTo: '/category', pathMatch: 'full' },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }