import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {
  AquaponicSystem,
  Component as SystemComponent,
} from '../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../@core/data/ponics.service';
import {AddLevelsModalComponent} from './add-levels/add-levels-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddEditComponentModalComponent} from './add-edit-component/add-edit-component-modal.component';
import {NbTabsetComponent} from '@nebular/theme/components/tabset/tabset.component';
import {ConfirmModalComponent} from '../../../modal/confirm-modal/confirm-modal.component';


@Component({
  selector: 'ngx-aquaponic-system',
  templateUrl: './aquaponic-system.component.html',
  styleUrls: ['./aquaponic-system.component.scss'],
})

export class AquaponicSystemComponent implements OnInit, AfterViewInit, OnDestroy {

  editing: boolean = false;
  paramsSubscription: Subscription;
  systemId: string;
  aquaponicSystem: AquaponicSystem;
  updateAquaponicSystemBusy: Promise<any>;
  loadAquaponicSystemBusy: Promise<any>;
  loadSystemComponentBusy: Promise<any>;
  @ViewChildren('organism') organismList;
  @ViewChild('componentTabs') componentTabs: NbTabsetComponent;

  constructor(
    private ponicsService: PonicsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private changeDetector: ChangeDetectorRef) {
    this.aquaponicSystem = new AquaponicSystem();
    this.aquaponicSystem.components = [];
  }

  private loadSystem(systemId: string) {
    this.loadSystemComponentBusy =
      this.ponicsService.getAquaponicSystem(systemId)
        .then(system => {
          if (system != null) {
            this.aquaponicSystem = system;
          }
        });
  }

  addLevelsModal() {
    const modal = this.modalService.open(AddLevelsModalComponent, {size: 'lg', container: 'nb-layout'});
    const addLevelsModalComponent = <AddLevelsModalComponent>modal.componentInstance;
    addLevelsModalComponent.systemId = this.aquaponicSystem.id;
  }

  addComponentModal() {
    const modal = this.modalService.open(AddEditComponentModalComponent, {size: 'lg', container: 'nb-layout'});
    const addComponentModal = <AddEditComponentModalComponent>modal.componentInstance;
    addComponentModal.systemId = this.aquaponicSystem.id;
    addComponentModal.editing = false;
  }


  editComponentModal() {
    const modal = this.modalService.open(AddEditComponentModalComponent, {size: 'lg', container: 'nb-layout'});
    const editComponentModal = <AddEditComponentModalComponent>modal.componentInstance;
    editComponentModal.systemId = this.aquaponicSystem.id;
    editComponentModal.component = this.selectedComponent();
    editComponentModal.editing = true;
  }

  deleteSystem()  {
    const modal = this.modalService.open(ConfirmModalComponent, {size: 'lg', container: 'nb-layout'});
    const deleteConfirmModalComponent = <ConfirmModalComponent>modal.componentInstance;

    deleteConfirmModalComponent.confirmModalTitle = 'Delete ' + this.aquaponicSystem.name;
    deleteConfirmModalComponent.challengeQuestion =
      'Are you Sure you wish to delete this system? If so please enter its name.';

    deleteConfirmModalComponent.challengeAnswer = this.aquaponicSystem.name;

    deleteConfirmModalComponent.confirmModalButtonText = 'Delete';
    deleteConfirmModalComponent.confirmationSuccessful = () => {
      this.ponicsService.deleteSystem(this.aquaponicSystem.id).then( () =>
        this.router.navigate(['/']),
      );
    };
  }

  deleteComponentModal() {
    const modal = this.modalService.open(ConfirmModalComponent, {size: 'lg', container: 'nb-layout'});
    const deleteConfirmModalComponent = <ConfirmModalComponent>modal.componentInstance;

    const componentName = this.selectedComponent().name;
    deleteConfirmModalComponent.confirmModalTitle = 'Delete ' + componentName;
    deleteConfirmModalComponent.challengeQuestion =
      'Are you Sure you wish to delete this system? If so please enter its name.';

    deleteConfirmModalComponent.challengeAnswer = componentName;

    deleteConfirmModalComponent.confirmModalButtonText = 'Delete';
    deleteConfirmModalComponent.confirmationSuccessful = () => {
      this.loadSystemComponentBusy = this.ponicsService
        .deleteComponent(this.systemId, this.selectedComponent().id)
        .then(() => this.loadSystem(this.systemId));
    };
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(
        (params) => {
          this.systemId = params['systemId'];
          this.loadSystem(this.systemId);
          this.ponicsService.componentUpdated.subscribe(() => this.loadSystem(this.systemId));
          this.ponicsService.componentAdded.subscribe(() => this.loadSystem(this.systemId));
          this.editing = this.router.url.endsWith('/edit');
        });
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

  private selectedComponent(): SystemComponent {
    const selectedTab = this.componentTabs.tabs.find(t => t.active);
    return this.aquaponicSystem.components.find( c => c.id === selectedTab.route);
  }
}
