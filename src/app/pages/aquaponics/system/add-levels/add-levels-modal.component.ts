// https://blog.dmbcllc.com/dynamically-add-components-in-angular/

import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import {LevelValueComponent} from './level-value/level-value.component';
import {ModalComponent} from '../../../../modal/modal.component';
import {levelQueries, tolerancesValidators} from '../../../../@core/data/PonicsMaps';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrganismService} from '../../../../@core/data/organism.service';
import {ToleranceTypes} from '../../../../@core/data/ToleranceTypes';

@Component({
  selector: 'ngx-add-levels-modal',
  templateUrl: './add-levels-modal.component.html',
})
export class AddLevelsModalComponent extends ModalComponent {
  @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef;
  time = {hour: 0, minute: 0};
  date: NgbDateStruct;
  levelValueComponents: LevelValueComponent[] = [];
  levelQueriesKeys: string[] =  Array.from(levelQueries.keys());
  levelReadingsForm: FormGroup;
  timePicker: FormControl =  new FormControl(
    null,
    [
      Validators.required,
    ],
  );

  constructor(
    private organismService: OrganismService,
    private componentFactoryResolver: ComponentFactoryResolver,
    activeModal: NgbActiveModal) {
    super(activeModal);
    const now = new Date();
    this.time = {hour: now.getHours(), minute: now.getMinutes()};
    this.date = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

    this.levelReadingsForm  = new FormGroup({
      'datePicker': new FormControl(
        null,
        [
          Validators.required,
        ],
      ),
      'timePicker': this.timePicker,
    });
  }

  addLevelValueInput(levelName: string) {
    console.log(levelName);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LevelValueComponent);
    const levelValueComponent = <LevelValueComponent>this.dynamicInsert.createComponent(componentFactory).instance;

    const levelValueControl =  new FormControl(
      null,
      [
        Validators.required,
      ],
    );
    levelValueComponent.levelName = levelName;
    levelValueComponent.onDeleteValue.subscribe((component) => {
      this.levelValueDeleted(component);
    });

    levelValueComponent.control = levelValueControl;

    const tolerance: ToleranceTypes = (ToleranceTypes)[levelName];
    levelValueComponent.validationErrorMessage = 'is required';
    if (tolerancesValidators.has(tolerance)) {
      const tolerancesValidator = tolerancesValidators.get(tolerance);
      levelValueControl.setValidators(tolerancesValidator.validator(levelName));
      levelValueComponent.validationErrorMessage = tolerancesValidator.validationErrorMessage;
    }

    this.levelValueComponents.push(levelValueComponent);

    this.levelQueriesKeys = this.levelQueriesKeys.filter( item => item !== levelName);
    this.levelReadingsForm.addControl(levelName, levelValueControl);
  }

  levelValueDeleted(levelValueComponent: LevelValueComponent) {
    const componentIndex = this.levelValueComponents.indexOf(levelValueComponent);

    if (componentIndex !== -1) {
      this.dynamicInsert.remove(this.levelValueComponents.indexOf(levelValueComponent));
      this.levelValueComponents.splice(componentIndex, 1);
      this.levelQueriesKeys.push(levelValueComponent.levelName);
      this.levelReadingsForm.removeControl(levelValueComponent.levelName);
    }
  }

  onSubmit() {
    this.closeModal();
  }
}
