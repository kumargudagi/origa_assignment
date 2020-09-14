import { Component, OnInit } from '@angular/core';
import { RestCalls } from '../../providers/http.provider'
import { ChartOptions, ChartType } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip
} from "ng2-charts";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   // Pie
   public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabels: Label[] = [
    "Latitude > 0",
    "Latitude < 0",
    "Longitude < 0",
    "Longitude > 0"
  ];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = false;
  public pieChartPlugins = [];
  colors = ['red', 'green', 'blue', 'yellow']
 public pieChartColors = [
    {
      backgroundColor: ['#ff0f3c', '#1bd4c3',  '#ffa93e','#ffb50f'],
    },
  ];
  users: any;

  constructor(private service: RestCalls) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.service.getAllCompany().subscribe(res => {
      const chartData = [0, 0, 0, 0];
        console.log(res);
        if (res) {
          res.forEach(user => {
            console.log(user);
            if (user.address.geo.lat > 0) {
              chartData[0] += 1;
            } else {
              chartData[1] += 1;
            }
            if (user.address.geo.lang > 0) {
              chartData[2] += 1;
            } else {
              chartData[3] += 1;
            }
          });
          console.log(chartData);
          this.pieChartData = chartData;
        }
        this.users=res
    }, err => {
      console.error(err)
    })
  }

}
