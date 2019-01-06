import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category/category.component';
// import { ItemsInCategoryComponent } from './items-in-category/items-in-category.component';
import { ItemsComponent } from './items/items.component';
import { DetailsComponent } from './details/details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent, },
  { path: ':catName', component: ItemsComponent , runGuardsAndResolvers: 'always'},
  { path: ':catName/:itemId', component: DetailsComponent },
  { path: '', redirectTo: '/category', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes
    //, { enableTracing: true } // <-- debugging purposes only
    ,{ onSameUrlNavigation: 'reload' }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }