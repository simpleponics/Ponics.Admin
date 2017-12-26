// https://blog.dmbcllc.com/dynamically-add-components-in-angular/

import {Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {LevelValueComponent} from './level-value/level-value.component';
import {ModalComponent} from '../../../../modal/modal.component';
import {levelQueries, tolerancesValidators} from '../../../../@core/data/PonicsMaps';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrganismService} from '../../../../@core/data/organism.service';
import {ToleranceTypes} from '../../../../@core/data/ToleranceTypes';
import {ZonedDateTime} from '../../../../@core/data/ZonedDateTime';
import {LevelReading} from '../../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../../@core/data/ponics.service';

@Component({
  selector: 'ngx-add-levels-modal',
  templateUrl: './add-levels-modal.component.html',
})
export class AddLevelsModalComponent extends ModalComponent {
  @Input() systemId: string;
  @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef;
  dateTime: ZonedDateTime;
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
    private ponicsService: PonicsService,
    private componentFactoryResolver: ComponentFactoryResolver,
    activeModal: NgbActiveModal) {
    super(activeModal);
    this.dateTime = new ZonedDateTime(new Date());

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
      this.levelQueriesKeys.push(levelValueComponent.type);
      this.levelReadingsForm.removeControl(levelValueComponent.type);
    }
  }

  onSubmit() {
    const levelReadings: LevelReading[] = [];
    for (const levelValueComponent of this.levelValueComponents) {
      levelValueComponent.levelReading.dateTime = this.dateTime.toString();
      levelReadings.push(levelValueComponent.levelReading);
    }
    this.ponicsService.addLevelReadings(this.systemId, levelReadings);
    this.closeModal();
  }
}
