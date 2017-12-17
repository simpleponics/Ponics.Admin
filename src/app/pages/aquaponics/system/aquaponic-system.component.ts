import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {AquaponicSystem} from '../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../@core/data/ponics.service';
import {NbTabsetComponent} from '@nebular/theme/components/tabset/tabset.component';
import {AddLevelsModalComponent} from './add-levels/add-levels-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddComponentModalComponent} from './add-component/add-component-modal.component';



@Component({
  selector: 'ngx-aquaponic-system',
  templateUrl: './aquaponic-system.component.html',
  styleUrls: ['./aquaponic-system.component.scss'],
})

export class AquaponicSystemComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  aquaponicSystem: AquaponicSystem = new AquaponicSystem();
  @ViewChild('componentTabs') componentTabs: NbTabsetComponent;
  busy: Promise<any>;

  constructor(
    private ponicsService: PonicsService,
    private route: ActivatedRoute,
    private modalService: NgbModal) {
    ponicsService.componentAdded.subscribe(
      () => {
        const systemId = this.route.snapshot.params['systemId'];
        this.ponicsService.getAquaponicSystem(systemId).then(
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
          this.ponicsService.getAquaponicSystem(params['systemId']).then(
            s => this.aquaponicSystem = s,
          );
        },
      );
  }

  onNameChange() {
    this.busy = this.ponicsService.updatedAquaponicSystem(this.aquaponicSystem);
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
