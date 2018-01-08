import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PonicsService} from '../../../../@core/data/ponics.service';
import {PonicsSystemAnalysisItem} from '../../../../@core/data/Ponics.Api.dtos';

@Component({
  selector: 'ngx-aquaponic-system-analysis',
  templateUrl: './aquaponic-system-analysis.component.html',
  styleUrls: ['./aquaponic-system-analysis.component.scss'],
})

export class AquaponicSystemAnalysisComponent implements AfterViewInit {

  @Input() systemId: string;
  analysis: PonicsSystemAnalysisItem[] = [];

  cardClass(a: PonicsSystemAnalysisItem): string {

    if (a.ponicsSystemAnalysisType === 'Error')
      return 'text-danger';

    if (a.ponicsSystemAnalysisType === 'Warning')
      return 'text-warning';

    return '';
  }

  constructor(
    private ponicsService: PonicsService) {
  }

  ngAfterViewInit(): void {
    this.ponicsService.getSystemAnalysis(this.systemId).then(analysis => this.analysis = analysis.items);
  }


}
