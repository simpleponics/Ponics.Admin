import {Component, Input, OnDestroy} from '@angular/core';
import {AquaponicSystem, Organism, Tolerance} from '../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../@core/data/ponics.service';
import {NbThemeService} from '@nebular/theme';
import {AddLevelsModalComponent} from '../../aquaponics/system/add-levels/add-levels-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {LevelTypes} from '../../../@core/data/LevelTypes';
import {scale, tolerances} from '../../../@core/data/PonicsMaps';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ZonedDateTime} from '../../../@core/data/ZonedDateTime';

import 'style-loader!angular2-toaster/toaster.css';

import * as shape from 'd3-shape';

@Component({
  selector: 'ngx-aquaponic-widget',
  templateUrl: './aquaponic-widget.component.html',
  styleUrls: ['./aquaponic-widget.component.scss'],
})
export class AquaponicWidgetComponent  implements OnDestroy  {
  @Input() systemId: string = '47236a2e40f047a2923034c610c5e444';
  @Input() selectedLevelType: LevelTypes = LevelTypes.pH;
  @Input() selectedOrganism: Organism = new Organism();
  system: AquaponicSystem = new AquaponicSystem();
  systemOrganisms: Organism[] = [];
  editing: boolean = false;
  toasterConfig: ToasterConfig;
  loadChartBusy: Promise<any>;

  levelTypeKeys(): Array<string> {
    return Object.keys(LevelTypes);
  }

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
    private theme: NbThemeService,
    private ponicsService: PonicsService,
    private modalService: NgbModal,
    private router: Router,
    private toasterService: ToasterService) {

    this.configureColorScheme();

    ponicsService.levelReadingsAdded.subscribe(() => this.configureData());

    this.ponicsService.getAquaponicSystem(this.systemId).then(
      system => {
        this.system = system;
        this.configureData();
      });

    this.ponicsService.getAquaponicSystemOrganisms(this.systemId).then(
      organisms => {
        this.systemOrganisms = organisms;
        this.selectedOrganism = organisms[0];
      });

    this.toasterConfig = new ToasterConfig({
      positionClass: 'toast-top-right',
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'fade',
      limit: 5,
    });

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

  private configureData() {
    this.loadChartBusy = this.ponicsService
      .getLevelReadings(this.systemId, this.selectedLevelType)
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
      });
  }

  addLevelsModal() {
    const modal = this.modalService.open(AddLevelsModalComponent, {size: 'lg', container: 'nb-layout'});
    const addLevelsModalComponent = <AddLevelsModalComponent>modal.componentInstance;
    addLevelsModalComponent.systemId = this.systemId;
  }

  addComponentModal() {
    this.router.navigate(['/pages/aquaponics/systems/' + this.systemId]);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  changeChartDetails() {
    this.editing = !this.editing;
  }

  organismChange(organism) {
    this.selectedOrganism = this.systemOrganisms.find(o => o.name === organism);
    this.configureData();
  }

  levelTypeChange(levelType) {
    this.selectedLevelType = levelType;
    this.configureData();
  }
}
