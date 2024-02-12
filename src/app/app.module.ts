import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterOutlet} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HighchartsChartModule} from "highcharts-angular";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule ,MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    NgbModule,
    HighchartsChartModule,
    HttpClientModule,
    NgxPaginationModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [
    MatPaginatorIntl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
