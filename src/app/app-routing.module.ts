import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToursComponent} from "./component/tours/tours.component";
import {DetailComponent} from "./component/detail/detail.component";

const routes: Routes = [
  {
    path: 'tours',
    component: ToursComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
