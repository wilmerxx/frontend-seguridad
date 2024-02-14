import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {EdgeService} from "../../service/edge.service";
import {EdgeUser} from "../../modelos/edge-user";
import {Edge} from "../../modelos/edge";

@Component({
  selector: 'app-graficos-edge',
  templateUrl: './graficos-edge.component.html',
  styleUrls: ['./graficos-edge.component.css']
})
export class GraficosEdgeComponent implements OnInit , AfterViewInit{
  HighchartsE1: typeof Highcharts = Highcharts; // required
  chartOptionsE1!: Highcharts.Options;
  totalPaginas: number = 0;
  chartE1: any;
  alertaCookiesDeSesion: number = 0;
  listaCookies: Edge[] = [];
 listaUsuarios: EdgeUser[] = [];
  constructor(private edgeService: EdgeService) { }

  @ViewChild('container2') container!: ElementRef;
  @ViewChild('alerta') alerta!: ElementRef;
  @ViewChild('cantidadUsuarios') cantidadUsuarios!: ElementRef;
  @ViewChild('cantidadPaginas') cantidadPaginas!: ElementRef;
  @ViewChild('cantidadCookies') cantidadCookies!: ElementRef;

  ngOnInit(): void {
    this.getCookiesDeSesion();
    this.getUsuariosContrasenia();
    this.getCookies();
    this.graficoNumeroDePaginasSinRepeticiones();
  }

  ngAfterViewInit() {
  }
  getUsuariosContrasenia(){
    this.edgeService.obtener_usuario_contrasenia().subscribe((res) => {
      this.listaUsuarios = res.map(user => ({
        ...user,
        showPassword: false, // inicializar showPassword como false
      }));
      if(this.listaUsuarios.length > 0){
        this.cantidadUsuarios.nativeElement.innerHTML = `<div class="alert alert-danger" role="alert">
    Se encontraron <b>${this.listaUsuarios.length}</b> usuarios con contraseñas guardadas ☢️☣️🔴😱 </div>`;
      }else {
        this.cantidadUsuarios.nativeElement.innerHTML = `<div class="alert alert-primary" role="alert">
            No se encontraron usuarios con contraseñas guardadas 😉👍 </div>`;
        }
    })
  }

  getCookiesDeSesion(){
    this.edgeService.get_edge_session_cookies().subscribe((res) => {
      this.alertaCookiesDeSesion = res.length;
      if(this.alertaCookiesDeSesion > 0){
        //si hay cookies de sesion se muestre una alerta en el html y se muestre el numero de cookies de sesion que se encontraron en color rojo
        this.alerta.nativeElement.innerHTML = `<div class="alert alert-danger" role="alert">
        Se encontraron <b>${this.alertaCookiesDeSesion}</b>  cookies de sesion 🚫👀
      </div>`;
      }else{
        //si no hay cookies de sesion se muestre una alerta en el html y se muestre el numero de cookies de sesion que se encontraron en color verde
        this.alerta.nativeElement.innerHTML = `<div class="alert alert-success" role="alert">
        No se encontraron cookies de sesion en la base de datos de Edge Browser
      </div>`;
      }
    })
  }

  graficoNumeroDePaginasSinRepeticiones(){
    this.edgeService.numeros_paginas_encontradas_sin_repetir().subscribe((res) => {
      var paginas: any[] = [], numeroPaginas: any[] = [];
      var colores: string[] = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];

      res.forEach((element: any, index:number) => {
        paginas.push(element[0]);
        numeroPaginas.push(element[1]);
        this.totalPaginas = this.totalPaginas + 1;
      });

      this.chartOptionsE1 = {
        chart: {
          type: 'column'
        },
        colors: colores,
        title: {
          text: 'Top 10 de paginas visitadas'
        },
        xAxis: {
          categories: paginas.slice(0, 10),
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Número de páginas'
          }
        },
        series: [{
          colorByPoint: true,
          color: '#7cb5ec',
          type: 'column',
          name: 'dominio de paginas visitadas',
          data: numeroPaginas.slice(0, 10),
        }]
      };

      this.chartE1 = this.HighchartsE1.chart(this.container.nativeElement, this.chartOptionsE1);
      this.cantidadPaginas.nativeElement.innerHTML = `<div class="alert alert-success" role="alert">
      Se encontraron <b>${this.totalPaginas}</b>  paginas visitadas
    </div>`;
    })
  }

  getCookies(){
    this.edgeService.getEdgeCookies().subscribe((res) => {
       this.listaCookies = res;
      this.cantidadCookies.nativeElement.innerHTML = `<div class="alert alert-info" role="alert">
      Se encontraron <b>${this.listaCookies.length}</b> cookies en la base de datos de Edge Browser
    </div>`;
    })
  }


}
