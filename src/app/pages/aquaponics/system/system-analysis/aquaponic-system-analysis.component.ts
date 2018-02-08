import {OnInit, Component, Input} from '@angular/core';
import {PonicsService} from '../../../../@core/data/ponics.service';
import {PonicsSystemAnalysisItem} from '../../../../@core/data/Ponics.Api.dtos';

@Component({
  selector: 'ngx-aquaponic-system-analysis',
  templateUrl: './aquaponic-system-analysis.component.html',
  styleUrls: ['./aquaponic-system-analysis.component.scss'],
})

export class AquaponicSystemAnalysisComponent implements OnInit {

  @Input() systemId: string = '';
  analysis: PonicsSystemAnalysisItem[] = [];
  analysisLoading: Promise<any>;

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

  ngOnInit(): void {
    this.analysisLoading = this.ponicsService.getSystemAnalysis(this.systemId)
      .then(analysis => this.analysis = analysis.items);
  }
}
