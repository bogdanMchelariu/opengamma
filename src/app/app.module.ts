/*
 * Copyright (C) 2018 - present by OpenGamma Inc. and the OpenGamma group of companies
 *
 * Please see distribution for license.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { CalculationService } from './calculation.service';
import { TableComponent } from './table/table.component';
import { TableRowComponent } from './table-row/table-row.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    TableComponent,
    TableRowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataService, CalculationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
