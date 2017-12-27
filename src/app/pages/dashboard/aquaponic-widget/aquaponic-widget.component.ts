import {Component, Input, OnDestroy} from '@angular/core';
import {AquaponicSystem} from '../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../@core/data/ponics.service';
import {NbThemeService} from '@nebular/theme';
import {AddLevelsModalComponent} from '../../aquaponics/system/add-levels/add-levels-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {LevelTypes} from '../../../@core/data/LevelTypes';

@Component({
  selector: 'ngx-aquaponic-widget',
  templateUrl: './aquaponic-widget.component.html',
  styleUrls: ['./aquaponic-widget.component.scss'],
})
export class AquaponicWidgetComponent  implements OnDestroy  {
  system: AquaponicSystem = new AquaponicSystem();
  @Input() systemId: string = '47236a2e40f047a2923034c610c5e444';
  options: any = {};

  multi = [];
  // options
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'ppm';
  colorScheme: any;

  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private ponicsService: PonicsService,
    private modalService: NgbModal,
    private router: Router) {


    this.ponicsService.getAquaponicSystem(this.systemId).then(
      s => {
        this.system = s;
        this.configureSeries();
      },
    );

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  configureSeries() {
    for (const levelType in LevelTypes) {
      if (isNaN(Number(levelType))) {
        const series = [];
        this.ponicsService.getLevelReadings(this.systemId, levelType).then(
          levels => {
            if (levels.length > 0) {
              for (const level of levels) {
                series.push({
                  name: level.dateTime,
                  value: level.value,
                });
              }
              this.multi.push({
                name: levelType,
                series: series
              });
            }
          });
      }
    }
    this.multi = [...this.multi];
    console.log(this.multi);

  }

  addLevelsModal() {
    const modal = this.modalService.open(AddLevelsModalComponent, {size: 'lg', container: 'nb-layout'});
    const addLevelsModalComponent = <AddLevelsModalComponent>modal.componentInstance;
    addLevelsModalComponent.systemId = this.systemId;
  }

  addComponentModal() {
    this.router.navigate(['/pages/aquaponics/systems/' + this.systemId]);
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
