import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatListModule, MatToolbarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatListModule,MatToolbarModule],
})

export class MaterialModule { }
