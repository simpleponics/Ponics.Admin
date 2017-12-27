import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {AquaponicWidgetComponent} from './aquaponic-widget/aquaponic-widget.component';
import {AddLevelsModalComponent} from '../aquaponics/system/add-levels/add-levels-modal.component';
import {LevelValueComponent} from '../aquaponics/system/add-levels/level-value/level-value.component';
import {AquaponicsModule} from '../aquaponics/aquaponics.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@NgModule({
  imports: [
    ThemeModule,
    AquaponicsModule,
    NgxChartsModule,
  ],
  declarations: [
    DashboardComponent,
    AquaponicWidgetComponent,
  ],
  entryComponents: [
    AddLevelsModalComponent,
    LevelValueComponent,
  ],
})
export class DashboardModule {
}
