import {ModuleWithProviders, NgModule} from '@angular/core';
import {OverrideHeaderComponent} from './header/header.component';


const COMPONENTS = [
  OverrideHeaderComponent,
];

@NgModule({
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class OverridesModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: OverridesModule,
    };
  }
}
