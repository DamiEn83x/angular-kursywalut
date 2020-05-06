import { Component, ViewChild, ElementRef, OnInit,Input,OnChanges,AfterViewInit,SimpleChanges,Inject  } from '@angular/core';
//import 'chartjs-plugin-annotation';
import { Chart } from 'chart.js';
import moment from 'moment';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnChanges  {
@Input() InputData;
@Input() lineChartLabels;

 title = 'Kurs';
   type = 'LineChart';
   data =  [['1',0]];
  // columnNames = ["Month", "Tokyo"];
   options = {   
      hAxis: {
         title: 'Data'
      },
      vAxis:{
         title: 'Kurs'
      },
   };
   width = 1000;
   height = 400;

 public lineChartData:Array<any> = [{
    data: [], 
    label: 'Series A',
    lineTension: 0,
    borderWidth: 1,
    fill: true,
    
  }];
  

  
  public lineChartOptions:any = {
    responsive: false,
     scales: {
      xAxes: [{

        gridLines: {
            display: true,
            drawBorder: false,
            borderDash: [5, 2],
            zeroLineBorderDash: [5, 2],
            zeroLineColor: '#c5c0bc',
            color: '#c5c0bc'
        },
        ticks: {
          fontStyle: 'normal',
          callback: function(value, index, values) {


            return value;
          }
        }
      }],
        yAxes: [{
            type: 'linear',
            ticks: {
              userCallback: function (tick) {
                return tick.toString() ;
              }
            },
            scaleLabel: {
              labelString: '',
              display: true
            }
          }]


    }
  }
  

    constructor(@Inject(DOCUMENT) private _document: Document) { }
  name = 'Angular   6';
  canvas: any;
  ctx: any;

      ngAfterViewInit() {

    }

  

   ngOnChanges(changes: SimpleChanges) 
   {
    if(this.InputData!=undefined)
    {
      this.data=this.InputData;
    } 
  }

}