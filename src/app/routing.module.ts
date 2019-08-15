import { LoginComponent } from './pages/login/login.component';
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
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
