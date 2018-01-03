import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {AquaponicWidgetComponent} from './aquaponic-widget/aquaponic-widget.component';
import {AddLevelsModalComponent} from '../aquaponics/system/add-levels/add-levels-modal.component';
import {LevelValueComponent} from '../aquaponics/system/add-levels/level-value/level-value.component';
import {AquaponicsModule} from '../aquaponics/aquaponics.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {environment} from '../../../environments/environment';
import {BusyModule} from 'angular2-busy';
import {LevelsChartComponent} from './aquaponic-widget/levels-chart/levels-chart.component';


@NgModule({
  imports: [
    ThemeModule,
    AquaponicsModule,
    NgxChartsModule,
    BusyModule.forRoot(environment.busyConfig),
  ],
  declarations: [
    DashboardComponent,
    AquaponicWidgetComponent,
    LevelsChartComponent,
  ],
  entryComponents: [
    AddLevelsModalComponent,
    LevelValueComponent,
  ],
})
export class DashboardModule {
}
