import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServicesService} from "../../service/services.service";
import {EdgeService} from "../../service/edge.service";
import * as Highcharts from "highcharts";
import {Edge} from "../../modelos/edge";
import {EdgeUser} from "../../modelos/edge-user";

@Component({
  selector: 'app-graficos-global',
  templateUrl: './graficos-global.component.html',
  styleUrls: ['./graficos-global.component.css']
})
export class GraficosGlobalComponent implements OnInit {

  HighchartsE1: typeof Highcharts = Highcharts; // required
  chartOptionsE1!: Highcharts.Options;
  totalPaginas: number = 0;
  chartE1: any;
  alertaCookiesDeSesion: number = 0;
  listaCookies: Edge[] = [];
  listaUsuarios: EdgeUser[] = [];

  @ViewChild('container2') container!: ElementRef;
  @ViewChild('alerta') alerta!: ElementRef;
  @ViewChild('cantidadUsuarios') cantidadUsuarios!: ElementRef;
  @ViewChild('cantidadPaginas') cantidadPaginas!: ElementRef;
  @ViewChild('cantidadCookies') cantidadCookies!: ElementRef;

  constructor(private  service:ServicesService, private edgeService: EdgeService) { }

  ngOnInit(): void {
    this.getCookies();
    this.getCookiesDeSesion();
    this.getUsuariosContrasenia();
    this.graficoNumeroDePaginasSinRepeticiones();
    this.getPaginasSinRepeticiones();
  }

  getUsuariosContrasenia(){
    this.edgeService.obtener_usuario_contrasenia().subscribe((res) => {
      let cantidadUsuarios = res.length;
      this.service.obtener_usuario_contrasenia().subscribe((res) => {
          cantidadUsuarios += res.length;
        if(cantidadUsuarios > 0){
          this.cantidadUsuarios.nativeElement.innerHTML = `<div class="alert alert-danger" role="alert">
    Se encontraron <b>${cantidadUsuarios}</b> usuarios con contraseñas guardadas ☢️☣️🔴😱 </div>`;
        }else {
          this.cantidadUsuarios.nativeElement.innerHTML = `<div class="alert alert-primary" role="alert">
            No se encontraron usuarios con contraseñas guardadas 😉👍 </div>`;
        }
      });
    })
  }

  getCookiesDeSesion(){
    this.edgeService.get_edge_session_cookies().subscribe((res) => {
      this.alertaCookiesDeSesion = res.length;
      this.service.get_edge_session_cookies().subscribe((res) => {
        this.alertaCookiesDeSesion += res.length;
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
      });

    })
  }

  getCookies(){
    this.edgeService.getEdgeCookies().subscribe((res) => {
      this.listaCookies = res;
      this.service.getChromeCookies().subscribe((res) => {
        this.listaCookies = this.listaCookies.concat(res);
        this.cantidadCookies.nativeElement.innerHTML = `<div class="alert alert-info" role="alert">
      Se encontraron <b>${this.listaCookies.length}</b> total de cookies
    </div>`;
      });
    })
  }

  getPaginasSinRepeticiones(){
    this.edgeService.numeros_paginas_encontradas_sin_repetir().subscribe((res) => {
      this.totalPaginas = res.length;
      this.service.numeros_paginas_encontradas_sin_repetir().subscribe((res) => {
        this.totalPaginas += res.length;
      });
      this.cantidadPaginas.nativeElement.innerHTML = `<div class="alert alert-success" role="alert">
      Se encontraron <b>${this.totalPaginas}</b>  paginas visitadas
    </div>`;
    })
  }

  graficoNumeroDePaginasSinRepeticiones(){
    this.edgeService.getEdgeCookies().subscribe((res) => {
      var paginas: any[] = [], numeroPaginas: any[] = [];
      var paginasEdge: any[] = [], numeroPaginasEdge: any[] = [];
      var data: any[] = [];
      res.forEach((element: any, index:number) => {
        paginasEdge.push(element.host_key);
        if (element.is_secure == 1){
          numeroPaginasEdge.push(element.is_secure);
        }
      });
      data.push({navegador:"Edge Browser", cantidadSession: numeroPaginasEdge.length, cantidadCookies: paginasEdge.length});

      this.service.getChromeCookies().subscribe((res) => {
        res.forEach((element: any, index:number) => {
          paginas.push(element.host_key);
          if (element.is_secure == 1){
            numeroPaginas.push(element.is_secure);
          }
        });

        data.push({navegador:"Chrome Browser", cantidadSession: numeroPaginas.length, cantidadCookies: paginas.length});
        console.log(data);
        this.chartOptionsE1 = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Cantidad de sesiones de navegacion y cookies almacenadas'
          },
          xAxis: {
            categories: data.map(item => item.navegador)
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Cantidad de sesiones de navegacion y cookies almacenadas'
            }
          },
          series: [{
            color: '#7cb5ec',
            type: 'column',
            name: 'Cantidad de sesiones de navegacion',
            data: data.map((item=>item.cantidadSession))
          },
            {
              color: '#f45b5b',
              type: 'column',
              name: 'Cantidad de cookies almacenadas',
              data: data.map((item=>item.cantidadCookies))
            }],

        };

        this.chartE1 = this.HighchartsE1.chart(this.container.nativeElement, this.chartOptionsE1);

      });


    })
  }

}
