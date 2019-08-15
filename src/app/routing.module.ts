import { PineappleListComponent } from './pages/pineapple-list/pineapple-list.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: FrontPageComponent
  },
  {
    path: 'pineapple', component: PineappleListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
