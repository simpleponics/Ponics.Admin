import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import {MenuService} from '../@core/data/menu.service';
import {PonicsService} from '../@core/data/ponics.service';
import {OrganismsModule} from './organisms/organisms.module';
import {OrganismService} from '../@core/data/organism.service';
import {ToasterModule} from 'angular2-toaster';
import {ToleranceAnalysisService} from '../@core/data/toleranceAnalysis.service';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    OrganismsModule,
    ToasterModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [MenuService, PonicsService, OrganismService, ToleranceAnalysisService],
})
export class PagesModule {
}
