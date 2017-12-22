﻿import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {AquaponicSystem} from '../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../@core/data/ponics.service';
import {AddLevelsModalComponent} from './add-levels/add-levels-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddComponentModalComponent} from './add-component/add-component-modal.component';
import {NbTabsetComponent} from '@nebular/theme/components/tabset/tabset.component';



@Component({
  selector: 'ngx-aquaponic-system',
  templateUrl: './aquaponic-system.component.html',
  styleUrls: ['./aquaponic-system.component.scss'],
})

export class AquaponicSystemComponent implements OnInit, AfterViewInit, OnDestroy {
  paramsSubscription: Subscription;
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
          this.loadSystemComponentBusy = this.ponicsService.getAquaponicSystem(systemId).then(
          s => this.aquaponicSystem = s,
        );
      },
    );
  }

  addLevelsModal() {
    this.modalService.open(AddLevelsModalComponent, {size: 'lg', container: 'nb-layout'});
  }

  addComponentModal()  {
    const modal = this.modalService.open(AddComponentModalComponent, {size: 'lg', container: 'nb-layout'});
    const addComponentModal = <AddComponentModalComponent>modal.componentInstance;
    addComponentModal.system = this.aquaponicSystem;
  }

  deleteSystem()  {
    this.ponicsService.deleteSystem(this.aquaponicSystem.id);
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(
        (params) => {
          this.loadAquaponicSystemBusy =
            this.ponicsService
              .getAquaponicSystem(params['systemId']).then(s => this.aquaponicSystem = s);
        },
      );
  }

  ngAfterViewInit(): void {
   this.organismList.changes.subscribe(() => {
       this.componentTabs.selectTab(this.componentTabs.tabs.first);
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
}
