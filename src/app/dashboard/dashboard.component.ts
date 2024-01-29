import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {createChart, CrosshairMode,ColorType} from "lightweight-charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chartElement!: ElementRef;
  @ViewChild('paginas') paginas!: ElementRef;
  @ViewChild('bar') bar!: ElementRef;
  @ViewChild('top10') top10!: ElementRef;

  public chart: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createChartAndAddSeries();
    this.crearPaginasVisitadas();
    this.crearBarSeries();
    this.crearTop10PaginasVisitadas();
  }

  createChartAndAddSeries() {
    this.chart = createChart(this.chartElement.nativeElement, {
      width: 800,
      height: 600,
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: 'rgba(33, 56, 77, 1)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 1)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 1)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
    });

    this.addAreaSeries();
  }

  crearPaginasVisitadas(){
    this.chart = createChart(this.paginas.nativeElement, {
      width: 800,
      height: 600,
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: 'rgba(33, 56, 77, 1)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 1)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 1)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
    });

    this.addPaginasVisitadas({
      topColor: "rgba(38, 198, 218, 0.56)",
      bottomColor: "rgba(38, 198, 218, 0.04)",
      lineColor: "rgba(38, 198, 218, 1)",
      lineWidth: 2,
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.remove();
      this.chart = null;
    }
  }

  public addAreaSeries() {
    const areaSeries = this.chart.addAreaSeries({
      topColor: 'rgba(38, 198, 218, 0.56)',
      bottomColor: 'rgba(38, 198, 218, 0.04)',
      lineColor: 'rgba(38, 198, 218, 1)',
      lineWidth: 2,
    });
    areaSeries.setData([
      {time: '2016-10-19', value: 54.98},
      {time: '2016-10-20', value: 56.12},
      {time: '2016-10-21', value: 57.24},
      {time: '2016-10-24', value: 56.93},
      {time: '2016-10-25', value: 57.64},
      {time: '2016-10-26', value: 57.74},
      {time: '2016-10-27', value: 57.59},
      {time: '2017-10-19', value: 54.9},
      {time: '2017-10-20', value: 56.01},
      {time: '2017-10-23', value: 55.43},
      {time: '2017-10-24', value: 54.16},
      {time: '2017-10-25', value: 54.16},
      {time: '2017-10-26', value: 54.16},
      {time: '2018-10-19', value: 54.9},
      {time: '2018-10-22', value: 57.21},
      {time: '2018-10-23', value: 58.79},
      {time: '2018-10-24', value: 57.42},
      {time: '2018-10-25', value: 56.43},
      {time: '2018-10-26', value: 56.43},
      {time: '2018-10-29', value: 56.43},
      {time: '2018-10-30', value: 56.43},
      {time: '2018-10-31', value: 56.43},
      {time: '2018-11-01', value: 56.43},
      {time: '2018-11-02', value: 56.43},
      {time: '2018-11-05', value: 56.43},
      {time: '2018-11-06', value: 56.43},
      {time: '2018-11-07', value: 56.43},
      {time: '2018-11-08', value: 56.43},
      {time: '2018-11-09', value: 56.43},
      {time: '2018-11-12', value: 56.43},
      {time: '2018-11-13', value: 56.43},
      {time: '2018-11-14', value: 56.43},
      {time: '2018-11-15', value: 56.43},
      {time: '2018-11-16', value: 56.43},
      {time: '2018-11-19', value: 56.43},
      {time: '2018-11-20', value: 56.43},
      {time: '2018-11-21', value: 56.43},
      {time: '2018-11-23', value: 56.43},
      {time: '2018-11-26', value: 56.43},
      {time: '2018-11-27', value: 56.43},
      {time: '2018-11-28', value: 56.43},
      {time: '2018-11-29', value: 56.43},
      {time: '2018-11-30', value: 56.43},
      {time: '2018-12-03', value: 56.43},
      {time: '2018-12-04', value: 56.43},
      {time: '2018-12-06', value: 56.43},
    ]);
  }

  //ahora graficar numeros de paginas web visitadas sin repeticiones
  //y en el eje x las fechas
  //y en el eje y el numero de paginas visitadas


  public addPaginasVisitadas(p: { topColor: string; lineColor: string; lineWidth: number; bottomColor: string }) {
    const areaPaginasVisitadas = this.chart.addAreaSeries({
      topColor: p.topColor,
      bottomColor: p.bottomColor,
      lineColor: p.lineColor,
      lineWidth: p.lineWidth,
    });
    areaPaginasVisitadas.setData([
      {time: '2016-10-19', value: 54.98},
      {time: '2016-10-20', value: 56.12},
      {time: '2016-10-21', value: 57.24},
      {time: '2016-10-24', value: 56.93},
      {time: '2016-10-25', value: 57.64},
      {time: '2016-10-26', value: 57.74},
      {time: '2016-10-27', value: 57.59},
      {time: '2017-10-19', value: 54.9},
      {time: '2017-10-20', value: 56.01},
      {time: '2017-10-23', value: 55.43},
      {time: '2017-10-24', value: 54.16},
      {time: '2017-10-25', value: 54.16},
      {time: '2017-10-26', value: 54.16},
      {time: '2018-10-19', value: 54.9},
      {time: '2018-10-22', value: 57.21},
      {time: '2018-10-23', value: 58.79},
      {time: '2018-10-24', value: 57.42},
      {time: '2018-10-25', value: 56.43},
      {time: '2018-10-26', value: 56.43},
      {time: '2018-10-29', value: 56.43},
      {time: '2018-10-30', value: 56.43},
      {time: '2018-10-31', value: 56.43},
      {time: '2018-11-01', value: 56.43},
      {time: '2018-11-02', value: 56.43},
      {time: '2018-11-05', value: 56.43},
      {time: '2018-11-06', value: 56.34},
    ]);
}

 public crearBarSeries() {
    this.chart = createChart(this.chartElement.nativeElement, {
      width: 800,
      height: 600,
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: 'rgba(33, 56, 77, 1)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 1)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 1)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
    });
    this.addBarSeries();
 }

  public addBarSeries() {
    const barSeries = this.chart.addHistogramSeries({
      color: '#26C6DA',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    barSeries.setData([
      { time: '2018-10-19', value: 18, color: '#26C6DA',text: 'holas' },
      { time: '2018-10-22', value: 15 , color: 'rgba(34,199,98,0.91)'},
      { time: '2018-10-23', value: 11 },
      { time: '2018-10-24', value: 6 },
      // Agrega más datos aquí
    ]);
  }

  public crearTop10PaginasVisitadas() {
    this.chart = createChart(this.top10.nativeElement, {
      // Configuración del gráfico
      width: 800,
      height: 600,
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: 'rgba(33, 56, 77, 1)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 1)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 1)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },

    });

    // Asume que tienes un array de objetos que representan las visitas a las páginas
    // Cada objeto tiene una propiedad 'pagina' y una propiedad 'visitas'
    const visitasPaginas = [
      { pagina: 'Página 1', visitas: 100 },
      { pagina: 'Página 2', visitas: 200 },
      { pagina: 'Página 3', visitas: 150 },
      // Agrega más datos aquí
    ];

    // Ordena el array en orden descendente de visitas
    const top10Paginas = visitasPaginas.sort((a, b) => b.visitas - a.visitas).slice(0, 10);

    // Crea una serie de barras para cada página
    const barSeries = this.chart.addHistogramSeries({
      color: '#26C6DA',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    // Establece los datos para la serie de barras
    barSeries.setData(top10Paginas.map(pagina => ({
      time: pagina.pagina,  // Usa el nombre de la página como la etiqueta de tiempo
      value: pagina.visitas,
    })));
  }


}
