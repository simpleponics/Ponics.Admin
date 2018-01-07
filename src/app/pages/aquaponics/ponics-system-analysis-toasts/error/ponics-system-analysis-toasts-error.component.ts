import {Component, OnInit} from '@angular/core';
import {Toast, ToasterService} from 'angular2-toaster';
import {AquaponicSystem} from '../../../../@core/data/Ponics.Api.dtos';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-ponics-system-analysis-toasts-error',
  templateUrl: './ponics-system-analysis-toasts-error.component.html',
})
export class PonicsSystemAnalysisToastsErrorComponent implements OnInit {

  public toast: Toast;
  system: AquaponicSystem = new AquaponicSystem();

  constructor(private router: Router,
              private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.system = this.toast.data;
    console.log(this.toast);
  }

  moreInformation() {
    this.toasterService.clear(this.toast.toastId);
    this.router.navigate(['/pages/aquaponics/systems/' + this.system.id]);
  }
}
