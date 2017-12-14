import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import {LevelValueComponent} from '../level-value/level-value.component';
import {PonicsService} from '../../../../../ponics.service';

@Component({
  selector: 'ngx-add-levels-modal',
  templateUrl: './add-levels-modal.component.html',
})
export class AddLevelsModalComponent  {
  @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef;
  time = {hour: 0, minute: 0};
  date: NgbDateStruct;

  levelQueriesKeys: string[] =  Array.from(this.ponicsService.levelQueries.keys());

  constructor(
    private ponicsService: PonicsService,
    private activeModal: NgbActiveModal,
    private componentFactoryResolver: ComponentFactoryResolver) {
    const now = new Date();
    this.time = {hour: now.getHours(), minute: now.getMinutes()};
    this.date = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  addLevelValueInput(levelName: string) {
    console.log(levelName);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LevelValueComponent);
    const levelValueComponent = <LevelValueComponent>this.dynamicInsert.createComponent(componentFactory).instance;
    levelValueComponent.levelName = levelName;

    const index = this.levelQueriesKeys.indexOf(levelName, 0);
    if (index > -1) {
      this.levelQueriesKeys.splice(index, 1);
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
