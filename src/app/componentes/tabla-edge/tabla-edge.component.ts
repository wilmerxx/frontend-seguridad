import {Component, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Edge} from "../../modelos/edge";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ServicesService} from "../../service/services.service";

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
  constructor(private service: ServicesService) { }

  _getEdge() {
    this.service.getEdge().subscribe(data => {
      this.usuariosEdge = data;
      console.log("datos de la tabla");
      console.log(this.usuariosEdge);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    }

  ngOnInit(): void {
    this.service.getEdge().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log("datos de la tabla");
      console.log(this.dataSource.data);
    });
    this._getEdge();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
