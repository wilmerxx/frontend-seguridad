import {Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as Highcharts from 'highcharts/highstock';
import {ColorType, createChart, CrosshairMode} from "lightweight-charts";
import {ServicesService} from "../../service/services.service";

@Component({
  selector: 'app-graficos-chrome',
  templateUrl: './graficos-chrome.component.html',
  styleUrls: ['./graficos-chrome.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GraficosChromeComponent implements OnInit , AfterViewInit{

  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions!: Highcharts.Options;
  chartOptions2!: Highcharts.Options;


  @ViewChild('chart') chartElement!: ElementRef;
  @ViewChild('paginas') paginas!: ElementRef;
  @ViewChild('bar') bar!: ElementRef;
  @ViewChild('top10') top10!: ElementRef;
  @ViewChild('dashboard', { static: true }) dashboardElement!: ElementRef;

  public chart: any;
  public paginasVisitadas: any;
  public top10PaginasVisitadas: any;
  public barChart: any;
  public usuarios: Array<any> = [];
  public contrasenias = [];


  constructor(private servicio: ServicesService) { }

  ngOnInit(): void {

    this.usuarios.length = 23;
    this.contrasenias.length = 12;
  }

  ngAfterViewInit() {
    this.createChartAndAddSeries();
    this.crearPaginasVisitadas();
    this.crearTop10PaginasVisitadas();
    this.crearBarChart();
    this.createDashboardChart();
    this.getChartOptions();
    this.updateChartSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateChartSize();
  }

  updateChartSize() {
    // Aquí es donde actualizas el tamaño de la gráfica basado en el tamaño de la ventana.
    // El código exacto dependerá de cómo estés creando y actualizando la gráfica.
    // Por ejemplo, si estás utilizando una biblioteca de gráficos, puede haber una función que puedes llamar para actualizar el tamaño de la gráfica.
    // Si estás creando la gráfica directamente en el DOM, puedes actualizar el tamaño del contenedor de la gráfica.
    // Aquí hay un ejemplo de cómo puedes hacerlo con la biblioteca de gráficos lightweight-charts:

    this.chart.resize(this.chartElement.nativeElement.clientWidth, this.chartElement.nativeElement.clientHeight);
    this.chart.timeScale().fitContent();


    this.paginasVisitadas.resize(this.paginas.nativeElement.clientWidth, this.paginas.nativeElement.clientHeight);
    this.paginasVisitadas.timeScale().fitContent();

    this.barChart.resize(this.bar.nativeElement.clientWidth, this.bar.nativeElement.clientHeight);
    this.barChart.timeScale().fitContent();

    this.top10PaginasVisitadas.resize(this.top10.nativeElement.clientWidth, this.top10.nativeElement.clientHeight);
    this.top10PaginasVisitadas.timeScale().fitContent();


  }

  createChartAndAddSeries() {

    this.chart = createChart(this.chartElement.nativeElement, {
      width: 600,
      height: 300,
      layout: {
        background: {type: ColorType.Solid, color: '#ffffff'},
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


  public addAreaSeries() {
    const areaSeries = this.chart.addAreaSeries(
      {
        topColor: 'rgba(33, 150, 243, 0.4)',
        bottomColor: 'rgba(33, 150, 243, 0.04)',
        lineColor: 'rgba(33, 150, 243, 1)',
        lineWidth: 2,
        crossHairMarkerVisible: false,
        crossHairMarkerRadius: 3,
        crossHairMarkerBorderColor: 'rgba(33, 150, 243, 1)',
        crossHairMarkerBackgroundColor: 'rgba(33, 150, 243, 1)',
        priceLineVisible: true,
        priceLineWidth: 1,
        priceLineColor: 'rgba(33, 150, 243, 1)',
        baseLineVisible: true,
        baseLineWidth: 1,
        baseLineColor: 'rgba(33, 150, 243, 1)',
        lastValueVisible: true,
        lastValueTextColor: 'rgba(33, 150, 243, 1)',
        lastValueFontSize: 12,
        lastValueFontFamily: 'Verdana',
        lastValueBackgroundColor: 'rgba(33, 150, 243, 1)',
        lastValueBorderColor: 'rgba(33, 150, 243, 1)',
        lastValueBorderRadius: 2,
        title: 'Número de Visitas',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      }
    );

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

  crearPaginasVisitadas() {
    this.paginasVisitadas = createChart(this.paginas.nativeElement, {
      width: 600,
      height: 300,
      layout: {
        background: {type: ColorType.Solid, color: '#ffffff'},
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

    this.addPaginasVisitadas();
  }

  public addPaginasVisitadas() {
    const areaPaginasVisitadas = this.paginasVisitadas.addAreaSeries({
      color: 'rgba(33, 150, 243, 0.4)',
      lineWidth: 2,
      topColor: 'rgba(33, 150, 243, 0.4)',
      bottomColor: 'rgba(33, 150, 243, 0.04)',
      lineColor: 'rgba(33, 150, 243, 1)',
      crossHairMarkerVisible: false,
      crossHairMarkerRadius: 3,
      crossHairMarkerBorderColor: 'rgba(33, 150, 243, 1)',
      crossHairMarkerBackgroundColor: 'rgba(33, 150, 243, 1)',
      priceLineVisible: true,
      priceLineWidth: 1,
      priceLineColor: 'rgba(33, 150, 243, 1)',
      baseLineVisible: true,
      baseLineWidth: 1,
      baseLineColor: 'rgba(33, 150, 243, 1)',
      lastValueVisible: true,
      lastValueTextColor: 'rgba(33, 150, 243, 1)',
      lastValueFontSize: 12,
      lastValueFontFamily: 'Verdana',
      lastValueBackgroundColor: 'rgba(33, 150, 243, 1)',
      lastValueBorderColor: 'rgba(33, 150, 243, 1)',
      lastValueBorderRadius: 2,
      title: 'Páginas Visitadas',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },

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

  public crearBarChart() {
    this.barChart = createChart(this.bar.nativeElement, {
      width: 600,
      height: 300,
      layout: {
        background: {type: ColorType.Solid, color: '#ffffff'},
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
        timeVisible: false,
        secondsVisible: true,
        lockVisibleTimeRangeOnResize: true,
        tickMarkFormatter: (time: number) => {
          const map: { [key: number]: string } = {
            1: 'Red',
            2: 'Blue',
            3: 'Yellow',
            4: 'Green',
            5: 'Purple',
            6: 'Orange'
          };
          return map[time];
        },
      },
    });

    this.addBarChart();
  }

  addBarChart() {
    const histogramSeries = this.barChart.addHistogramSeries({
      lastValueVisible: true,
      color: 'rgba(33, 150, 243, 0.4)',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    histogramSeries.setData([
      {time: 1, value: 54.98},
      {time: 2, value: 56.12},
      {time: 3, value: 51.24},
      {time: 4, value: 45.93},
      {time: 5, value: 23.64},
      {time: 6, value: 63.74},
    ]);
  }

  public crearTop10PaginasVisitadas() {
    this.top10PaginasVisitadas = createChart(this.top10.nativeElement, {
      width: 600,
      height: 300,
      layout: {
        background: {type: ColorType.Solid, color: '#ffffff'},
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
        timeVisible: false,
        secondsVisible: true,
        lockVisibleTimeRangeOnResize: true,
        tickMarkFormatter: (time: number) => {
          const map: { [key: number]: string } = {
            1: 'Red',
            2: 'Blue',
            3: 'Yellow',
            4: 'Green',
            5: 'Purple',
            6: 'Orange'
          };
          return map[time];
        },
      },
    });

    this.addTop10PaginasVisitadas();

  }

  addTop10PaginasVisitadas() {
    const histogramSeries = this.top10PaginasVisitadas.addHistogramSeries({
      lastValueVisible: true,
      color: 'rgba(33, 150, 243, 0.4)',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    histogramSeries.setData([
      {time: 1, value: 54.98},
      {time: 2, value: 56.12},
      {time: 3, value: 51.24},
      {time: 4, value: 45.93},
      {time: 5, value: 23.64},
      {time: 6, value: 63.74},
    ]);
  }


  createDashboardChart() {
    this.chartOptions = { // required
      title: {
        text: 'Comparacion de ventas de Tokyo y London',
        align: 'center'
      },
      series: [{
        type: 'bar',
        data: [1, 2, 3, 4, 5],
        name: 'Tokyo',
        color: 'rgba(33, 150, 243, 1)',
      }, {
        type: 'bar',
        data: [3, 4, 5, 6, 7],
        name: 'London',
        color: 'rgba(33, 150, 243, 0.4)',
      }]
    }
  }

  getChartOptions(){
    this.chartOptions2 = { // required
      title: {
        text: 'Comparacion de ventas de Tokyo y London',
        align: 'center'
      },
      series: [{
        type: 'bar',
        data: [1, 2, 3, 4, 5],
        name: 'Tokyo',
        color: 'rgba(33, 150, 243, 1)',
      }, {
        type: 'bar',
        data: [3, 4, 5, 6, 7],
        name: 'London',
        color: 'rgba(33, 150, 243, 0.4)',
      }]
    }
  }

}
