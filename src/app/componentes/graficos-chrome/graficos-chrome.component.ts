import {Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ServicesService} from "../../service/services.service";
import * as Highcharts from "highcharts";
import {ChromeUser} from "../../modelos/chrome-user";
import {ChromeCookies} from "../../modelos/chrome-cookies";

@Component({
  selector: 'app-graficos-chrome',
  templateUrl: './graficos-chrome.component.html',
  styleUrls: ['./graficos-chrome.component.css'],
})
export class GraficosChromeComponent implements OnInit , AfterViewInit{

  HighchartsE1: typeof Highcharts = Highcharts; // required
  chartOptionsE1!: Highcharts.Options;
  totalPaginas: number = 0;
  chartE1: any;
  alertaCookiesDeSesion: number = 0;
  listaCookies: ChromeCookies[] = [];
  listaUsuarios: ChromeUser[] = [];
  constructor(private servicio: ServicesService) { }

  @ViewChild('container2') container!: ElementRef;
  @ViewChild('alerta') alerta!: ElementRef;
  @ViewChild('cantidadUsuarios') cantidadUsuarios!: ElementRef;
  @ViewChild('cantidadPaginas') cantidadPaginas!: ElementRef;
  @ViewChild('cantidadCookies') cantidadCookies!: ElementRef;
  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {

  }

  loadData(){
    this.getUsuariosContrasenia();
    this.getCookiesDeSesion();
    this.graficoNumeroDePaginasSinRepeticiones();
    this.getCookies();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateChartSize();
  }

  updateChartSize() {
    if (this.chartE1) {
      this.chartE1.setSize(
        this.container.nativeElement.offsetWidth,
        this.container.nativeElement.offsetHeight,
        false
      );
    }
  }

  getUsuariosContrasenia(){
    this.servicio.obtener_usuario_contrasenia().subscribe((res) => {
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
    this.servicio.get_edge_session_cookies().subscribe((res) => {
      this.alertaCookiesDeSesion = res.length;
      if(this.alertaCookiesDeSesion > 0){
        //si hay cookies de sesion se muestre una alerta en el html y se muestre el numero de cookies de sesion que se encontraron en color rojo
        this.alerta.nativeElement.innerHTML = `<div class="alert alert-danger" role="alert">
        Se encontraron <b>${this.alertaCookiesDeSesion}</b>  cookies de sesion 🚫👀
      </div>`;
      }else{
        //si no hay cookies de sesion se muestre una alerta en el html y se muestre el numero de cookies de sesion que se encontraron en color verde
        this.alerta.nativeElement.innerHTML = `<div class="alert alert-success" role="alert">
        No se encontraron cookies de sesion en la base de datos de Chrome Browser
      </div>`;
      }
    })
  }

  graficoNumeroDePaginasSinRepeticiones(){
    this.servicio.numeros_paginas_encontradas_sin_repetir().subscribe((res) => {
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
    this.servicio.getChromeCookies().subscribe((res) => {
      this.listaCookies = res;
      this.cantidadCookies.nativeElement.innerHTML = `<div class="alert alert-info" role="alert">
      Se encontraron <b>${this.listaCookies.length}</b> cookies en la base de datos de Chrome Browser
    </div>`;
    })
  }

}
