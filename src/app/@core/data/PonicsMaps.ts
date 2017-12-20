import {
  AddAmmoniaTolerance,
  AddIronTolerance,
  AddNitrateTolerance,
  AddNitriteTolerance,
  AddPhTolerance,
  AddSalinityTolerance,
  AmmoniaTolerance,
  AnalyseToleranceAmmonia,
  AnalyseToleranceIron,
  AnalyseToleranceNitrate,
  AnalyseToleranceNitrite,
  AnalyseTolerancePh,
  AnalyseToleranceSalinity,
  IronTolerance,
  NitrateTolerance,
  NitriteTolerance,
  PhTolerance,
  SalinityTolerance,
} from './Ponics.Api.dtos';
import {ToleranceTypes} from './ToleranceTypes';
import {pHValidator} from '../validators/phValidator';
import {AbstractControl, ValidationErrors} from '@angular/forms';

export const levelQueries: Map<ToleranceTypes, any> = new Map([
  [ToleranceTypes.Salinity, new AnalyseToleranceSalinity()],
  [ToleranceTypes.Iron, new AnalyseToleranceIron()],
  [ToleranceTypes.Nitrate, new AnalyseToleranceNitrate()],
  [ToleranceTypes.Nitrite, new AnalyseToleranceNitrite()],
  [ToleranceTypes.Ammonia, new AnalyseToleranceAmmonia],
  [ToleranceTypes.Ph, new AnalyseTolerancePh()],
]);

export const addToleranceCommands: Map<ToleranceTypes, any> = new Map([
  [ToleranceTypes.Salinity, new AddSalinityTolerance()],
  [ToleranceTypes.Iron, new AddIronTolerance()],
  [ToleranceTypes.Nitrate, new AddNitrateTolerance()],
  [ToleranceTypes.Nitrite, new AddNitriteTolerance()],
  [ToleranceTypes.Ammonia, new AddAmmoniaTolerance()],
  [ToleranceTypes.Ph, new AddPhTolerance()],
]);

export const tolerances: Map<ToleranceTypes, any> = new Map([
  [ToleranceTypes.Salinity, new SalinityTolerance()],
  [ToleranceTypes.Iron, new IronTolerance()],
  [ToleranceTypes.Nitrate, new NitrateTolerance()],
  [ToleranceTypes.Nitrite, new NitriteTolerance()],
  [ToleranceTypes.Ammonia, new AmmoniaTolerance()],
  [ToleranceTypes.Ph, new PhTolerance()],
]);

export const tolerancesValidators: Map<
  ToleranceTypes,
  {
    validationErrorMessage: string,
    validator: (formControlName: string) => (
      control: AbstractControl) => (
        {} | ValidationErrors
      ),
  }> = new Map([
  [ToleranceTypes.Ph, {
    validationErrorMessage: 'is required to be between 0 and 14.',
    validator: pHValidator,
  }],
]);




