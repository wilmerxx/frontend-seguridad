import {Component, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Edge} from "../../modelos/edge";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ServicesService} from "../../service/services.service";
import {EdgeService} from "../../service/edge.service";

@Component({
  selector: 'app-tabla-edge',
  templateUrl: './tabla-edge.component.html',
  styleUrls: ['./tabla-edge.component.css']
})
export class TablaEdgeComponent implements OnInit , AfterViewInit{
  displayedColumns: string[] = ['index','name','creation_utc', 'expires_utc', 'host_key', 'last_access_utc','encrypted_value'];
  dataSource!: MatTableDataSource<Edge>;
  public usuariosEdge: Array<any> = [];
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('short1') sort!: MatSort;
  constructor(private service: EdgeService) { }
  ngOnInit(): void {
    this.service.getEdgeCookies().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.usuariosEdge = data;
    });

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
