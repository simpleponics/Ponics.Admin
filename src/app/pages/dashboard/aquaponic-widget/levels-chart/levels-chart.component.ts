import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import { PonicsService } from '../../../../@core/data/ponics.service';
import * as shape from 'd3-shape';
import {scale} from '../../../../@core/data/PonicsMaps';
import {ZonedDateTime} from '../../../../@core/data/ZonedDateTime';
import {LevelReading, Tolerance} from '../../../../@core/data/Ponics.Api.dtos';
import {LevelTypes} from '../../../../@core/data/LevelTypes';
import {ToleranceAnalysisService} from '../../../../@core/data/toleranceAnalysis.service';
import {NbThemeService} from '@nebular/theme';

@Component({
    selector: 'ngx-levels-chart',
    templateUrl: './levels-chart.component.html',
    styleUrls: ['./levels-chart.component.scss'],
})

export class LevelsChartComponent implements OnDestroy, OnChanges   {

  @Input() levelReadings: LevelReading[];
  @Input() levelType: LevelTypes;
  @Input() tolerance: Tolerance;

  data = [];
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel: string;
  colorScheme: any;
  themeSubscription: any;
  customColors: any[];
  colors: any;
  autoScale = true;
  curve = shape.curveMonotoneX;
  timeline: boolean = true;

  constructor(
    ponicsService: PonicsService,
    private theme: NbThemeService) {
    this.configureColorScheme();
    ponicsService.levelReadingsAdded.subscribe(() => this.configureData());
  }

  private configureColorScheme() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      this.colorScheme = {
        domain: [
          this.colors.primaryLight,
          this.colors.infoLight,
          this.colors.successLight,
          this.colors.warningLight,
          this.colors.dangerLight,
        ],
      };
    });
  }

  configureData() {
    const readings = [];
    const upper = [];
    const lower = [];
    const desiredUpper = [];
    const desiredLower = [];
    this.data = [];
    this.yAxisLabel = scale.get(this.levelType);

    for (const level of this.levelReadings) {
      const readingDate = ZonedDateTime.fromString(level.dateTime).toDate();
      readings.push({
        name: readingDate,
        value: level.value,
      });

      if (this.tolerance != null) {
        upper.push({
          name: readingDate,
          value: this.tolerance.upper,
          min: this.tolerance.lower,
          max: this.tolerance.upper,
        });

        lower.push({
          name: readingDate,
          value: this.tolerance.lower,
          min: this.tolerance.lower,
          max: this.tolerance.upper,
        });

        desiredUpper.push({
          name: readingDate,
          value: this.tolerance.desiredUpper,
          min: this.tolerance.desiredLower,
          max: this.tolerance.desiredUpper,
        });

        desiredLower.push({
          name: readingDate,
          value: this.tolerance.desiredLower,
          min: this.tolerance.desiredLower,
          max: this.tolerance.desiredUpper,
        });
      }

      this.customColors = [
        {
          name: 'Upper ' + this.levelType + ' tolerance',
          value: this.colors.aquaponicWidget.limit,
        },
        {
          name: 'Lower ' + this.levelType + ' tolerance',
          value: this.colors.aquaponicWidget.limit,
        },
        {
          name: 'Desired Upper ' + this.levelType + ' tolerance',
          value: this.colors.aquaponicWidget.desired,
        },
        {
          name: 'Desired Lower ' + this.levelType + ' tolerance',
          value: this.colors.aquaponicWidget.desired,
        },
      ];
    }


    this.data = [
      {
        name: 'Upper ' + this.levelType + ' tolerance',
        series: upper,
      },
      {
        name: 'Lower ' + this.levelType + ' tolerance',
        series: lower,
      },
      {
        name: 'Desired Upper ' + this.levelType + ' tolerance',
        series: desiredUpper,
      },
      {
        name: 'Desired Lower ' + this.levelType + ' tolerance',
        series: desiredLower,
      },
      {
        name: this.levelType + ' level',
        series: readings,
      },
    ];

    this.data = [...this.data];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.configureData();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
