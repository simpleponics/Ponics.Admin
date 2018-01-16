// https://blog.dmbcllc.com/dynamically-add-components-in-angular/

import {Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {NgbActiveModal, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

import {LevelValueComponent} from './level-value/level-value.component';
import {ModalComponent} from '../../../../modal/modal.component';
import {levelQueries, tolerancesValidators} from '../../../../@core/data/PonicsMaps';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LevelTypes} from '../../../../@core/data/LevelTypes';
import {LevelReading} from '../../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../../@core/data/ponics.service';
import {ZonedDateTime} from '../../../../@core/data/ZonedDateTime';


@Component({
  selector: 'ngx-add-levels-modal',
  templateUrl: './add-levels-modal.component.html',
})
export class AddLevelsModalComponent extends ModalComponent {
  private now: Date = new Date();

  @Input() systemId: string;
  @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef;
  date: NgbDateStruct = {day: this.now.getDate(), month: this.now.getMonth() + 1, year: this.now.getFullYear()};
  time: NgbTimeStruct  = {hour : this.now.getHours(), minute: this.now.getMinutes(), second: 0};
  levelValueComponents: LevelValueComponent[] = [];
  levelQueriesKeys: string[] =  Array.from(levelQueries.keys());
  levelReadingsForm: FormGroup;

  private _levelsFormControl = new FormControl(
    null,
    [
      Validators.required,
    ],
  );

  constructor(
    private ponicsService: PonicsService,
    private componentFactoryResolver: ComponentFactoryResolver,
    activeModal: NgbActiveModal) {
    super(activeModal);

    this.levelReadingsForm = new FormGroup({
      'datePicker': new FormControl(
        null,
        [
          Validators.required,
        ],
      ),
      'timePicker': new FormControl(
        null,
        [
          Validators.required,
        ],
      ),
      'levels': this._levelsFormControl,
    });
  }

  addLevelValueInput(levelName: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LevelValueComponent);
    const levelValueComponent = <LevelValueComponent>this.dynamicInsert.createComponent(componentFactory).instance;

    const levelValueControl =  new FormControl(
      null,
      [
        Validators.required,
      ],
    );
    levelValueComponent.type = levelName;
    levelValueComponent.onDeleteValue.subscribe((component) => {
      this.levelValueDeleted(component);
    });

    levelValueComponent.control = levelValueControl;

    const tolerance: LevelTypes = (LevelTypes)[levelName];
    levelValueComponent.validationErrorMessage = 'is required';
    if (tolerancesValidators.has(tolerance)) {
      const tolerancesValidator = tolerancesValidators.get(tolerance);
      levelValueControl.setValidators(tolerancesValidator.validator(levelName));
      levelValueComponent.validationErrorMessage = tolerancesValidator.validationErrorMessage;
    }

    this.levelValueComponents.push(levelValueComponent);

    this.levelQueriesKeys = this.levelQueriesKeys.filter( item => item !== levelName);
    this.levelReadingsForm.addControl(levelName, levelValueControl);

    this.levelReadingsForm.removeControl('levels');
  }

  levelValueDeleted(levelValueComponent: LevelValueComponent) {
    const componentIndex = this.levelValueComponents.indexOf(levelValueComponent);

    if (componentIndex !== -1) {
      this.dynamicInsert.remove(this.levelValueComponents.indexOf(levelValueComponent));
      this.levelValueComponents.splice(componentIndex, 1);
      this.levelQueriesKeys.push(levelValueComponent.type);
      this.levelReadingsForm.removeControl(levelValueComponent.type);
    }

    if (this.levelValueComponents.length === 0) {
      this.levelReadingsForm.addControl('levels', this._levelsFormControl);
    }
  }

  onSubmit() {
    const levelReadings: LevelReading[] = [];
    for (const levelValueComponent of this.levelValueComponents) {
      levelValueComponent.levelReading.dateTime = ZonedDateTime.fromDateAndTime(this.date, this.time).toString();
      levelReadings.push(levelValueComponent.levelReading);
    }
    this.ponicsService.addLevelReadings(this.systemId, levelReadings);
    this.closeModal();
  }
}
