import {EventEmitter, Injectable} from '@angular/core';
import {
  AddOrganism,
  GetAllOrganisms,
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
  client = new JsonServiceClient(environment.PonicsApi);

  getOrganism(id: string)  {
    const query = new GetOrganism();
    query.id = id;
    return this.client.get(query);
  }

  getOrganisms() {
    const query = new GetAllOrganisms();
    return this.client.get(query);
  }

  addOrganism(organism: Organism) {
    const command = new AddOrganism();
    command.organism = organism;
    const promise = this.client.post(command);
    promise.then(r =>
      this.organismAdded.emit(organism),
    );

    return promise;
  }

  addTolerance(organismId: string, tolerance: any, toleranceTypes: ToleranceTypes) {
    const command = toleranceCommands.get(toleranceTypes).add;
    command.organismId = organismId;
    command.tolerance = tolerance;

    const promise = this.client.post(command);
    promise.then(r =>
      this.toleranceAdded.emit(tolerance),
    );

    return promise;
  }

  deleteTolerance(organismId: string, tolerance: any) {
    const key = Array.from(tolerances.keys()).find(k => tolerances.get(k).constructor.name === tolerance.type);
    const command = toleranceCommands.get(key).delete;
    command.organismId = organismId;
    this.client.delete(command);
  }

  upateOrganism(organism: Organism) {
    const command = new UpdateOrganism();
    command.id = organism.id;
    command.organism = organism;
    const promise = this.client.post(command);
    promise.then( () => this.organismUpdated.emit(organism));
    return promise;
  }

  getMissingTolerances(organism: Organism) {
    let missingTolerances: string[] = Array.from(toleranceCommands.keys());
    tolerances.forEach(
      (value: any, key: ToleranceTypes) => {
        if (organism.tolerances.some(t => t.type !== value.constructor.name)) {
          missingTolerances = missingTolerances.filter( item => item !== key);
        }
      });

    return missingTolerances;
  }
}
