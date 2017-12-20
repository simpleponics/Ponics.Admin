import {EventEmitter, Injectable} from '@angular/core';
import {AddOrganism, GetAllOrganisms, GetOrganism, Organism, Tolerance, UpdateOrganism} from './Ponics.Api.dtos';
import {ToleranceTypes} from './ToleranceTypes';
import {addToleranceCommands, tolerances} from './PonicsMaps';
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
    const command = addToleranceCommands.get(toleranceTypes);
    command.organismId = organismId;
    command.tolerance = tolerance;

    const promise = this.client.post(command);
    promise.then(r =>
      this.toleranceAdded.emit(tolerance),
    );

    return promise;
  }

  upateOrganism(organism: Organism) {
    const command = new UpdateOrganism();
    command.id = organism.id;
    command.organism = organism;
    const promise = this.client.post(command);
    promise.then( r =>
      this.organismUpdated.emit(organism));

    return promise;
  }

  getMissingTolerances(organism: Organism) {
    let missingTolerances: string[] = Array.from(addToleranceCommands.keys());
    tolerances.forEach(
      (value: any, key: ToleranceTypes) => {
        if (organism.tolerances.some(t => t.type !== value.constructor.name)) {
          missingTolerances = missingTolerances.filter( item => item !== key);
        }
      });

    return missingTolerances;
  }
}
