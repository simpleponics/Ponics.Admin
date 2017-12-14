import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {AquaponicSystem} from '../../../Ponics.Api.dtos';
import {PonicsService} from '../../../ponics.service';
import {NbTabsetComponent} from '@nebular/theme/components/tabset/tabset.component';
import {AddLevelsModalComponent} from './add-levels/add-levels-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngx-aquaponics-system',
  templateUrl: './aquaponics-system.component.html',
})

export class AquaponicsSystemComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  aquaponicSystem: AquaponicSystem = new AquaponicSystem();
  @ViewChild('componentTabs') componentTabs: NbTabsetComponent;

  constructor(private ponicsService: PonicsService, private route: ActivatedRoute, private modalService: NgbModal) {
  }

  addLevelsModal() {
    const activeModal = this.modalService.open(AddLevelsModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(
        (params) => {
          this.ponicsService.getAquaponicSystem(params['systemId']).then(
            r => this.aquaponicSystem = r,
          );
        },
      );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
