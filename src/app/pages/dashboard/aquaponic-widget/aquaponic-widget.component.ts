import {Component, Input, OnDestroy} from '@angular/core';
import {
  AquaponicSystem,
  LevelReading,
  Organism,
  Tolerance,
  LevelAnalysis,
} from '../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../@core/data/ponics.service';
import {AddLevelsModalComponent} from '../../aquaponics/system/add-levels/add-levels-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {LevelTypes} from '../../../@core/data/LevelTypes';
import {ToleranceAnalysisService} from '../../../@core/data/toleranceAnalysis.service';
import {tolerances} from '../../../@core/data/PonicsMaps';
import {
  BodyOutputType,
  Toast,
  ToasterService,
} from 'angular2-toaster';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbThemeService,
} from '@nebular/theme';

@Component({
  selector: 'ngx-aquaponic-widget',
  templateUrl: './aquaponic-widget.component.html',
  styleUrls: ['./aquaponic-widget.component.scss'],
})
export class AquaponicWidgetComponent implements OnDestroy {

  @Input() systemId: string = '47236a2e40f047a2923034c610c5e444';
  @Input() organismId: string= '41f7ac0ab53c478e845f20b85fdafd93';
  @Input() levelType: LevelTypes = LevelTypes.pH;

  organism: Organism = new Organism();
  system: AquaponicSystem = new AquaponicSystem();
  systemOrganisms: Organism[] = [];
  editing: boolean = false;
  loadChartBusy: Promise<any>;
  analysis: LevelAnalysis;
  latestReading: LevelReading = new LevelReading();
  tolerance: Tolerance = new Tolerance();
  levelReadings: LevelReading[] = [];

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  levelTypeKeys(): Array<string> {
    return Object.keys(LevelTypes);
  }

  constructor(
    private ponicsService: PonicsService,
    private toleranceAnalysisService: ToleranceAnalysisService,
    private modalService: NgbModal,
    private router: Router,
    private toasterService: ToasterService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });

    ponicsService.addingLevelReadings.subscribe( p => this.loadChartBusy = p);

    ponicsService.levelReadingsAdded.subscribe(systemId => this.getLevelReadings());

    ponicsService.getAquaponicSystem(this.systemId)
      .then(system => this.system = system)
      .then(system =>  ponicsService.getAquaponicSystemOrganisms(system.id)
        .then(organisms => this.systemOrganisms = organisms)
        .then(organisms => this.organism = organisms.find(o => o.id === this.organismId)))
      .then(() => this.getLevelReadings());
  }

  getLevelReadings() {
    this.loadChartBusy = this.ponicsService.getLevelReadings(this.systemId, this.levelType).then(
      levels => {
        this.levelReadings = [];
        const tolerance = tolerances.get(this.levelType);
        this.tolerance = this.organism.tolerances.find(t => t.type === tolerance.name);
        console.log(this.organism.tolerances );
        console.log(this.levelType);
        this.latestReading = levels[levels.length - 1];
        this.levelReadings = levels;

        if (this.levelReadings.length === 0) {
          this.noLevelReadings();
          return;
        }
        this.toleranceNotDefined();
        this.analyseLevel();
      },
    );
  }

  analyseLevel() {
    if (this.latestReading == null) {
      return;
    }

    this.toleranceAnalysisService
      .analyseLevelReading(this.latestReading.value, LevelTypes[this.latestReading.type], this.organism.id)
      .then((analysis: LevelAnalysis) => {
          this.analysis = analysis;

          if (!analysis.suitableForOrganism) {
            const toast: Toast = {
              type: 'error',
              title: 'Organism Error',
              body: 'a reading of ' +
              this.latestReading.value +
              ' for ' + this.latestReading.type +
              ' is not autablal for ' +
              this.organism.name,
              bodyOutputType: BodyOutputType.TrustedHtml,
            };
            this.toasterService.popAsync(toast);
          }
        },
      );
  }

  noLevelReadings() {
    const toast: Toast = {
      type: 'warning',
      title: 'System Warning',
      body: this.system.name + ' does not have any ' + this.levelType + ' level readings logged!',
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  toleranceNotDefined() {
    if (this.tolerance == null) {
      const toast: Toast = {
        type: 'warning',
        title: 'Organism Warning',
        body: this.organism.name + ' does not have a ' + this.levelType + ' tolerance defined!',
        bodyOutputType: BodyOutputType.TrustedHtml,
      };
      this.toasterService.popAsync(toast);
    }
  }

  addLevelsModal() {
    const modal = this.modalService.open(AddLevelsModalComponent, {size: 'lg', container: 'nb-layout'});
    const addLevelsModalComponent = <AddLevelsModalComponent>modal.componentInstance;
    addLevelsModalComponent.systemId = this.systemId;
  }

  editSystem() {
    this.router.navigate(['/pages/aquaponics/systems/' + this.systemId]);
  }

  changeChartDetails() {
    this.editing = !this.editing;
  }

  organismChange(organism) {
    this.organism = this.systemOrganisms.find(o => o.name === organism);
    this.organismId = this.organism.id;
    this.getLevelReadings();
  }

  levelTypeChange(levelType) {
    this.levelType = levelType;
    this.analysis = null;
    this.getLevelReadings();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
