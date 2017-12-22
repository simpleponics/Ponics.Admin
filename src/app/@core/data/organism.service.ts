import {EventEmitter, Injectable} from '@angular/core';
import {
  AddOrganism,
  GetOrganisms,
  GetOrganism,
  Organism,
  Tolerance,
  UpdateOrganism,
} from './Ponics.Api.dtos';
import {ToleranceTypes} from './ToleranceTypes';
import {toleranceCommands, tolerances} from './PonicsMaps';
import {JsonServiceClient} from 'servicestack-client';
import {environment} from '../../../environments/environment';

@Injectable()
export class OrganismService {
  organismAdded = new EventEmitter<Organism>();
  organismUpdated = new EventEmitter<Organism>();
  toleranceAdded  = new EventEmitter<Tolerance>();
  toleranceUpdated = new EventEmitter<Tolerance>();
  toleranceDeleted = new EventEmitter<Tolerance>();
  client = new JsonServiceClient(environment.PonicsApi);

  getOrganism(id: string)  {
    const query = new GetOrganism();
    query.id = id;
    return this.client.get(query);
  }

  getOrganisms(ids?: string[]):  Promise<Array<Organism>> {
    const query = new GetOrganisms();
    if (ids != null) {
      query.organismsIds = ids;
    }
    return this.client.get(query);
  }

  addOrganism(organism: Organism): Promise<any> {
    const command = new AddOrganism();
    command.organism = organism;
    const p = this.client.post(command);
    p.then(() => this.organismAdded.emit(organism));
    return p;
  }

  addTolerance(organismId: string, tolerance: any, toleranceTypes: ToleranceTypes): Promise<any>  {
    const command = toleranceCommands.get(toleranceTypes).add;
    command.organismId = organismId;
    command.tolerance = tolerance;
    const p = this.client.post(command);
    p.then(() => this.toleranceAdded.emit(tolerance));
    return p;
  }

  deleteTolerance(organismId: string, tolerance: any): Promise<any>  {
    const key = this.findToleranceTypeKeyFromToleranceObject(tolerance);
    const command = toleranceCommands.get(key).delete;
    command.organismId = organismId;
    const p = this.client.delete(command);
    p.then( () => this.toleranceDeleted.emit(tolerance));
    return p;
  }


  updateTolerance(organismId: string, tolerance: any): Promise<any> {
    const key = this.findToleranceTypeKeyFromToleranceObject(tolerance);
    const command = toleranceCommands.get(key).update;
    command.organismId = organismId;
    command.tolerance = tolerance;
    const p = this.client.put(command);
    p.then( () => this.toleranceUpdated.emit(tolerance));
    return p;
  }

  updateOrganism(organism: Organism): Promise<any> {
    const command = new UpdateOrganism();
    command.id = organism.id;
    command.organism = organism;
    const p = this.client.post(command);
    p.then( () => this.organismUpdated.emit(organism));
    return p;
  }

  findToleranceTypeKeyFromToleranceObject(tolerance: any): ToleranceTypes {
    return this.findToleranceTypeKeyFromToleranceObjectType(tolerance.type);
  }

  findToleranceTypeKeyFromToleranceObjectType(tolerance: string): ToleranceTypes {
    return Array.from(tolerances.keys()).find(k => tolerances.get(k).constructor.name === tolerance);
  }

  getMissingTolerances(organism: Organism): string[] {
    let missingTolerances: string[] = Array.from(toleranceCommands.keys());
    tolerances.forEach(
      (value: any, key: ToleranceTypes) => {
        if (organism.tolerances.some(t => t.type === value.constructor.name)) {
          missingTolerances = missingTolerances.filter( item => item !== key);
        }
      });

    return missingTolerances;
  }
}
