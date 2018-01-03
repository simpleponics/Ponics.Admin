import {Component, Input} from '@angular/core';
import {AquaponicSystem, LevelReading, Organism} from '../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../@core/data/ponics.service';
import {NbThemeService} from '@nebular/theme';
import {AddLevelsModalComponent} from '../../aquaponics/system/add-levels/add-levels-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {LevelTypes} from '../../../@core/data/LevelTypes';
import {ToleranceAnalysisService} from '../../../@core/data/toleranceAnalysis.service';

@Component({
  selector: 'ngx-aquaponic-widget',
  templateUrl: './aquaponic-widget.component.html',
  styleUrls: ['./aquaponic-widget.component.scss'],
})
export class AquaponicWidgetComponent {
  @Input() systemId: string = '47236a2e40f047a2923034c610c5e444';
  @Input() selectedLevelType: LevelTypes = LevelTypes.pH;
  @Input() selectedOrganism: Organism = new Organism();
  system: AquaponicSystem = new AquaponicSystem();
  systemOrganisms: Organism[] = [];
  editing: boolean = false;
  loadChartBusy: Promise<any>;
  suitableForOrganism: boolean = true;
  latestReading: LevelReading = new LevelReading();

  levelTypeKeys(): Array<string> {
    return Object.keys(LevelTypes);
  }

  constructor(
    private ponicsService: PonicsService,
    private toleranceAnalysisService: ToleranceAnalysisService,
    private modalService: NgbModal,
    private router: Router) {

    ponicsService.addingLevelReadings.subscribe( p => this.loadChartBusy = p);

    ponicsService.getAquaponicSystem(this.systemId).then(
    system => {
      this.system = system;
      ponicsService.getAquaponicSystemOrganisms(this.systemId).then(
        organisms => {
          this.systemOrganisms = organisms;
          this.selectedOrganism = organisms[0];
        });
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

  changeChartDetails() {
    this.editing = !this.editing;
  }

  organismChange(organism) {
    this.selectedOrganism = this.systemOrganisms.find(o => o.name === organism);
  }

  levelTypeChange(levelType) {
    this.selectedLevelType = levelType;
  }
}
