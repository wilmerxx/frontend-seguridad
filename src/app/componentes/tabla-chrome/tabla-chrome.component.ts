import {Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ChromeCookies} from "../../modelos/chrome-cookies";
import {ServicesService} from "../../service/services.service";

@Component({
  selector: 'app-tabla-chrome',
  templateUrl: './tabla-chrome.component.html',
  styleUrls: ['./tabla-chrome.component.css']
})
export class TablaChromeComponent implements OnInit, AfterViewInit{
  displayedColumns2: string[] = ['index','name','creation_utc', 'expires_utc', 'host_key', 'last_access_utc','encrypted_value'];
  dataSource2!: MatTableDataSource<ChromeCookies>;

  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('sort2') sort2!: MatSort;
  constructor(private service: ServicesService) { }


  ngOnInit(): void {
   this.loadTable();
  }

  ngAfterViewInit(): void {
  this.loadTable();
  }

  loadTable(){
    this.service.getChromeCookies().subscribe(data => {
      this.dataSource2 = new MatTableDataSource(data);
      this.dataSource2.paginator = this.paginator2;
      this.dataSource2.sort = this.sort2;
    });
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

}
