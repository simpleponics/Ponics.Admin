import {AfterViewInit, Component} from '@angular/core';
import {PonicsService} from '../../@core/data/ponics.service';
import {BodyOutputType, Toast, ToasterService} from 'angular2-toaster';
import {
  PonicsSystemAnalysisToastsErrorComponent,
} from '../aquaponics/ponics-system-analysis-toasts/error/ponics-system-analysis-toasts-error.component';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit {
  constructor(
    private ponicsService: PonicsService,
    private toasterService: ToasterService) {
  }

  ngAfterViewInit(): void {
    this.ponicsService.getAquaponicSystems().then(
      systems => {
        for (const system of systems) {
          this.analysePonicsSystem(this.ponicsService, system);
        }
      },
    );
  }

  analysePonicsSystem(ponicsService: PonicsService, system) {
    ponicsService.getSystemAnalysis(system.id).then(
      analysis => {
        if (analysis.items.find(a => a.ponicsSystemAnalysisType === 'Error')) {
          const toast: Toast = {
            type: 'error',
            title: 'Aquaponic Systems Error',
            body: PonicsSystemAnalysisToastsErrorComponent,
            bodyOutputType: BodyOutputType.Component,
            data: system,
          };
          this.toasterService.popAsync(toast);
        }
      });
  }
}
