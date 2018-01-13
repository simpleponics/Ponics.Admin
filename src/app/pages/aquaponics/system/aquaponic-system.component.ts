import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { AquaponicSystem} from '../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../@core/data/ponics.service';
import {AddLevelsModalComponent} from './add-levels/add-levels-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddEditComponentModalComponent} from './add-edit-component/add-edit-component-modal.component';
import {NbTabsetComponent} from '@nebular/theme/components/tabset/tabset.component';


@Component({
  selector: 'ngx-aquaponic-system',
  templateUrl: './aquaponic-system.component.html',
  styleUrls: ['./aquaponic-system.component.scss'],
})

export class AquaponicSystemComponent implements OnInit, AfterViewInit, OnDestroy {

  editing: boolean = false;
  paramsSubscription: Subscription;
  systemId: string;
  componentId: string;
  aquaponicSystem: AquaponicSystem = new AquaponicSystem();
  updateAquaponicSystemBusy: Promise<any>;
  loadAquaponicSystemBusy: Promise<any>;
  loadSystemComponentBusy: Promise<any>;
  @ViewChildren('organism') organismList;
  @ViewChild('componentTabs') componentTabs: NbTabsetComponent;

  constructor(
    private ponicsService: PonicsService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private changeDetector: ChangeDetectorRef) {
    ponicsService.componentAdded.subscribe(
      () => {
        const systemId = this.route.snapshot.params['systemId'];
          this.loadSystemComponentBusy =
            this.ponicsService.getAquaponicSystem(systemId)
              .then(system => this.aquaponicSystem = system);
      },
    );
  }

  addLevelsModal() {
    const modal = this.modalService.open(AddLevelsModalComponent, {size: 'lg', container: 'nb-layout'});
    const addLevelsModalComponent = <AddLevelsModalComponent>modal.componentInstance;
    addLevelsModalComponent.systemId = this.aquaponicSystem.id;
  }

  addComponentModal()  {
    const modal = this.modalService.open(AddEditComponentModalComponent, {size: 'lg', container: 'nb-layout'});
    const addComponentModal = <AddEditComponentModalComponent>modal.componentInstance;
    addComponentModal.systemId = this.aquaponicSystem.id;
    addComponentModal.editing = false;
  }

  editComponentModal() {
    const modal = this.modalService.open(AddEditComponentModalComponent, {size: 'lg', container: 'nb-layout'});
    const editComponentModal = <AddEditComponentModalComponent>modal.componentInstance;
    editComponentModal.systemId = this.aquaponicSystem.id;
    editComponentModal.component = this.aquaponicSystem.components.find(s => s.id === this.componentId);
    editComponentModal.editing = true;
  }

  deleteSystem()  {
    this.ponicsService.deleteSystem(this.aquaponicSystem.id);
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(
        (params) => {
          this.systemId = params['systemId'];
          this.loadAquaponicSystemBusy =
            this.ponicsService
              .getAquaponicSystem(this.systemId)
              .then(s => this.aquaponicSystem = s)
              .then(s => this.componentId = s.components[0].id);
        },
      );
  }

  ngAfterViewInit(): void {
    this.organismList.changes.subscribe(() => {
      // https://github.com/angular/angular/issues/17572#issuecomment-353357588
      this.changeDetector.detectChanges();
    });
  }

  onNameChange() {
    this.updateAquaponicSystemBusy = this.ponicsService.updateAquaponicSystem(this.aquaponicSystem);
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  saveSystem() {
    this.editing = !this.editing;
  }

  editSystem() {
    this.editing = !this.editing;
  }

  changeTab() {
    if (this.componentTabs != null) {
      this.componentId = this.componentTabs.tabs.find(t => t.active).route;
    }
  }
}
