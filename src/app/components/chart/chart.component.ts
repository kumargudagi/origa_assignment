import { Component, OnInit, Input } from '@angular/core';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  @Input() pieChartLabels: Label[] = [];
  @Input() pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['#ff0f3c', '#1bd4c3',  '#ffa93e','#ffb50f'],
    },
  ];
  public pieChartLegend = false;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
  }



}
