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
import {LevelTypes} from './LevelTypes';
import {pHValidator} from '../validators/phValidator';
import {AbstractControl, ValidationErrors} from '@angular/forms';

export const levelQueries: Map<LevelTypes, any> = new Map([
  [LevelTypes.Salinity, new AnalyseToleranceSalinity()],
  [LevelTypes.Iron, new AnalyseToleranceIron()],
  [LevelTypes.Nitrate, new AnalyseToleranceNitrate()],
  [LevelTypes.Nitrite, new AnalyseToleranceNitrite()],
  [LevelTypes.Ammonia, new AnalyseToleranceAmmonia],
  [LevelTypes.pH, new AnalyseTolerancePh()],
]);

export const toleranceCommands: Map<LevelTypes, {delete: any, update: any, add: any}> = new Map([
  [LevelTypes.Salinity, {
    add: new AddSalinityTolerance(),
    update: new UpdateSalinityTolerance(),
    delete: new DeleteSalinityTolerance(),
  }],

  [LevelTypes.Iron, {
    add: new AddIronTolerance(),
    update: new UpdateIronTolerance(),
    delete: new DeleteIronTolerance(),
  }],

  [LevelTypes.Nitrate, {
    add: new AddNitrateTolerance(),
    update: new UpdateNitrateTolerance(),
    delete: new DeleteNitrateTolerance(),
  }],

  [LevelTypes.Nitrite, {
    add: new AddNitriteTolerance(),
    update: new UpdateNitriteTolerance(),
    delete: new DeleteNitriteTolerance(),
  }],

  [LevelTypes.Nitrite, {
    add: new AddNitriteTolerance(),
    update: new UpdateNitriteTolerance(),
    delete: new DeleteNitriteTolerance(),
  }],

  [LevelTypes.Ammonia, {
    add: new AddAmmoniaTolerance(),
    update: new UpdateAmmoniaTolerance(),
    delete: new DeleteAmmoniaTolerance(),
  }],

  [LevelTypes.pH, {
    add: new AddPhTolerance(),
    update: new UpdatePhTolerance(),
    delete: new DeletePhTolerance(),
  }],
]);

export const tolerances: Map<LevelTypes, any> = new Map([
  [LevelTypes.Salinity, new SalinityTolerance()],
  [LevelTypes.Iron, new IronTolerance()],
  [LevelTypes.Nitrate, new NitrateTolerance()],
  [LevelTypes.Nitrite, new NitriteTolerance()],
  [LevelTypes.Ammonia, new AmmoniaTolerance()],
  [LevelTypes.pH, new PhTolerance()],
]);

export const tolerancesValidators: Map<
  LevelTypes,
  {
    validationErrorMessage: string,
    validator: (formControlName: string) => (
      control: AbstractControl) => (
        {} | ValidationErrors
      ),
  }> = new Map([
  [LevelTypes.pH, {
    validationErrorMessage: 'is required to be between 0 and 14.',
    validator: pHValidator,
  }],
]);




