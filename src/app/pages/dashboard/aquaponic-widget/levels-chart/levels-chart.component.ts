import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import { PonicsService } from '../../../../@core/data/ponics.service';
import * as shape from 'd3-shape';
import {scale, tolerances} from '../../../../@core/data/PonicsMaps';
import {ZonedDateTime} from '../../../../@core/data/ZonedDateTime';
import {BodyOutputType, Toast, ToasterService} from 'angular2-toaster';
import {
  AquaponicSystem, LevelReading, Organism, Tolerance,
  ToleranceAnalysis
} from '../../../../@core/data/Ponics.Api.dtos';
import {LevelTypes} from '../../../../@core/data/LevelTypes';
import {ToleranceAnalysisService} from '../../../../@core/data/toleranceAnalysis.service';
import {NbThemeService} from '@nebular/theme';


@Component({
    selector: 'ngx-levels-chart',
    templateUrl: './levels-chart.component.html',
})

export class LevelsChartComponent implements OnDestroy, OnChanges   {

  @Input() system: AquaponicSystem;
  @Input() selectedLevelType: LevelTypes = LevelTypes.pH;
  @Input() selectedOrganism: Organism = new Organism();
  @Input() loadChartBusy: Promise<any>;
  @Input() latestReading: LevelReading;
  @Input() suitableForOrganism: boolean;

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
    private ponicsService: PonicsService,
    private toasterService: ToasterService,
    private toleranceAnalysisService: ToleranceAnalysisService,
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
    this.loadChartBusy = this.ponicsService
      .getLevelReadings(this.system.id, this.selectedLevelType)
      .then(levels => {
        const readings = [];
        const upper = [];
        const lower = [];
        const desiredUpper = [];
        const desiredLower = [];
        this.data = [];
        this.yAxisLabel = scale.get(this.selectedLevelType);

        const tolerance = tolerances.get(this.selectedLevelType);
        const organismTolerance: Tolerance = this.selectedOrganism.tolerances
          .find(t => t.type === tolerance.constructor.name);

        if (organismTolerance == null) {
          const toast: Toast = {
            type: 'warning',
            title: 'Organism Warning',
            body: this.selectedOrganism.name + ' does not have a ' + this.selectedLevelType + ' tolerance defined!',
            bodyOutputType: BodyOutputType.TrustedHtml,
          };
          this.toasterService.popAsync(toast);
        }

        if (levels.length === 0) {
          const toast: Toast = {
            type: 'warning',
            title: 'System Warning',
            body: this.system.name + ' does not have any ' + this.selectedLevelType + ' level readings logged!',
            bodyOutputType: BodyOutputType.TrustedHtml,
          };
          this.toasterService.popAsync(toast);
          return;
        }

        for (const level of levels) {
          const readingDate = ZonedDateTime.fromString(level.dateTime).toDate();
          readings.push({
            name: readingDate,
            value: level.value,
          });
          if (organismTolerance != null) {
            upper.push({
              name: readingDate,
              value: organismTolerance.upper,
              min: organismTolerance.lower,
              max: organismTolerance.upper,
            });

            lower.push({
              name: readingDate,
              value: organismTolerance.lower,
              min: organismTolerance.lower,
              max: organismTolerance.upper,
            });

            desiredUpper.push({
              name: readingDate,
              value: organismTolerance.desiredUpper,
              min: organismTolerance.desiredLower,
              max: organismTolerance.desiredUpper,
            });

            desiredLower.push({
              name: readingDate,
              value: organismTolerance.desiredLower,
              min: organismTolerance.desiredLower,
              max: organismTolerance.desiredUpper,
            });
          }

          this.customColors = [
            {
              name: 'Upper ' + this.selectedLevelType + ' tolerance',
              value: this.colors.aquaponicWidget.limit,
            },
            {
              name: 'Lower ' + this.selectedLevelType + ' tolerance',
              value: this.colors.aquaponicWidget.limit,
            },
            {
              name: 'Desired Upper ' + this.selectedLevelType + ' tolerance',
              value: this.colors.aquaponicWidget.desired,
            },
            {
              name: 'Desired Lower ' + this.selectedLevelType + ' tolerance',
              value: this.colors.aquaponicWidget.desired,
            },
          ];
        }


        this.data = [
          {
            name: 'Upper ' + this.selectedLevelType + ' tolerance',
            series: upper,
          },
          {
            name: 'Lower ' + this.selectedLevelType + ' tolerance',
            series: lower,
          },
          {
            name: 'Desired Upper ' + this.selectedLevelType + ' tolerance',
            series: desiredUpper,
          },
          {
            name: 'Desired Lower ' + this.selectedLevelType + ' tolerance',
            series: desiredLower,
          },
          {
            name: this.selectedLevelType + ' level',
            series: readings,
          },
        ];

        this.data = [...this.data];

        this.latestReading = levels[levels.length - 1];

        this.toleranceAnalysisService
          .analyseLevelReading(this.latestReading.value, LevelTypes[this.latestReading.type], this.selectedOrganism.id)
          .then((analysis: ToleranceAnalysis) => {
              this.suitableForOrganism = analysis.suitableForOrganism;

              if (!analysis.suitableForOrganism) {
                const toast: Toast = {
                  type: 'error',
                  title: 'Organism Error',
                  body: 'a reading of ' +
                  this.latestReading.value +
                  ' for ' + this.latestReading.type +
                  ' is not autablal for ' +
                  this.selectedOrganism.name,
                  bodyOutputType: BodyOutputType.TrustedHtml,
                };
                this.toasterService.popAsync(toast);
              }
            },
          );
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.configureData();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
