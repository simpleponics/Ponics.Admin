import { Component } from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {
  AnalyseAmmonia,
  AnalyseIron,
  AnalyseNitrate,
  AnalyseNitrite,
  AnalysePh,
  AnalyseSalinity,
} from '../../../../../Ponics.Api.dtos';

@Component({
  selector: 'ngx-add-levels-modal',
  templateUrl: './add-levels-modal.component.html',
})
export class AddLevelsModalComponent {
  time = {hour: 0, minute: 0};
  date: NgbDateStruct;

  levelTypes: any[] = [
    new AnalyseSalinity(),
    new AnalyseIron(),
    new AnalyseNitrate(),
    new AnalyseNitrite(),
    new AnalyseAmmonia(),
    new AnalysePh(),
  ];

  constructor(private activeModal: NgbActiveModal) {
    const now = new Date();
    this.time = {hour: now.getHours(), minute: now.getMinutes()};
    this.date = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  closeModal() {
    this.activeModal.close();
  }
}
