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
  AnalyseToleranceSalinity, DeleteAmmoniaTolerance, DeleteIronTolerance, DeleteNitrateTolerance, DeleteNitriteTolerance,
  DeletePhTolerance,
  DeleteSalinityTolerance,
  IronTolerance,
  NitrateTolerance,
  NitriteTolerance,
  PhTolerance,
  SalinityTolerance, UpdateAmmoniaTolerance, UpdateIronTolerance, UpdateNitrateTolerance, UpdateNitriteTolerance,
  UpdatePhTolerance,
  UpdateSalinityTolerance,
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
  [ToleranceTypes.pH, new AnalyseTolerancePh()],
]);

export const toleranceCommands: Map<ToleranceTypes, {delete: any, update: any, add: any}> = new Map([
  [ToleranceTypes.Salinity, {
    add: new AddSalinityTolerance(),
    update: new UpdateSalinityTolerance(),
    delete: new DeleteSalinityTolerance(),
  }],

  [ToleranceTypes.Iron, {
    add: new AddIronTolerance(),
    update: new UpdateIronTolerance(),
    delete: new DeleteIronTolerance(),
  }],

  [ToleranceTypes.Nitrate, {
    add: new AddNitrateTolerance(),
    update: new UpdateNitrateTolerance(),
    delete: new DeleteNitrateTolerance(),
  }],

  [ToleranceTypes.Nitrite, {
    add: new AddNitriteTolerance(),
    update: new UpdateNitriteTolerance(),
    delete: new DeleteNitriteTolerance(),
  }],

  [ToleranceTypes.Nitrite, {
    add: new AddNitriteTolerance(),
    update: new UpdateNitriteTolerance(),
    delete: new DeleteNitriteTolerance(),
  }],

  [ToleranceTypes.Ammonia, {
    add: new AddAmmoniaTolerance(),
    update: new UpdateAmmoniaTolerance(),
    delete: new DeleteAmmoniaTolerance(),
  }],

  [ToleranceTypes.pH, {
    add: new AddPhTolerance(),
    update: new UpdatePhTolerance(),
    delete: new DeletePhTolerance(),
  }],
]);

export const tolerances: Map<ToleranceTypes, any> = new Map([
  [ToleranceTypes.Salinity, new SalinityTolerance()],
  [ToleranceTypes.Iron, new IronTolerance()],
  [ToleranceTypes.Nitrate, new NitrateTolerance()],
  [ToleranceTypes.Nitrite, new NitriteTolerance()],
  [ToleranceTypes.Ammonia, new AmmoniaTolerance()],
  [ToleranceTypes.pH, new PhTolerance()],
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
  [ToleranceTypes.pH, {
    validationErrorMessage: 'is required to be between 0 and 14.',
    validator: pHValidator,
  }],
]);




