import {EventEmitter, Injectable} from '@angular/core';
import {
  AddComponent, AddOrganism,
  AddSystem,
  AnalyseAmmonia,
  AnalyseIron,
  AnalyseNitrate,
  AnalyseNitrite,
  AnalysePh,
  AnalyseSalinity,
  AquaponicSystem, Component, GetAllOrganisms,
  GetAllSystems,
  GetOrganism,
  GetSystem, Organism, UpdateOrganism,
  UpdateSystem,
} from './Ponics.Api.dtos';
import {JsonServiceClient} from 'servicestack-client';
import {environment} from '../../../environments/environment';

@Injectable()
export class PonicsService {
  systemAdded = new EventEmitter<AquaponicSystem>();
  componentAdded = new EventEmitter<Component>();
  systemUpdated = new EventEmitter<AquaponicSystem>();
  organismUpdated = new EventEmitter<Organism>();
  organismAdded = new EventEmitter<Organism>();

  levelQueries: Map<string, any> = new Map([
    ['Salinity', new AnalyseSalinity()],
    ['Iron', new AnalyseIron()],
    ['Nitrate', new AnalyseNitrate()],
    ['Nitrite', new AnalyseNitrite()],
    ['Ammonia', new AnalyseAmmonia],
    ['pH', new AnalysePh()],
  ]);

  client = new JsonServiceClient(environment.PonicsApi);

  getAquaponicSystems() {
    const query = new GetAllSystems();
    return this.client.get(query);
  }

  getAquaponicSystem(id: string) {
    const query = new GetSystem();
    query.id = id;
    return this.client.get(query);
  }

  addAquaponicSystem(system: AquaponicSystem) {
    const command = new AddSystem();
    command.system = system;
    this.client.post(command)
      .then(r =>
        this.systemAdded.emit(system),
      );
  }

  addComponent(systemId: string, component: Component) {
    const command = new AddComponent();
    command.systemId = systemId;
    command.component = component;
    const promise = this.client.post(command);
    promise.then(r =>
        this.componentAdded.emit(component),
      );
    return promise;
  }

  addOrganism(organism: Organism)
  {
    const command = new AddOrganism();
    command.organism = organism;
    const promise = this.client.post(command);
    promise.then(r =>
      this.organismAdded.emit(organism)
    );

    return promise;
  }

  updateAquaponicSystem(system: AquaponicSystem) {
    const command = new UpdateSystem();
    command.id = system.id;
    command.system = system;
    const promise = this.client.post(command);
    promise.then(r =>
      this.systemUpdated.emit(system),
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

  deleteSystem(systemId: string) {
  }

  deleteOrganism(organism: string) {
  }

  getOrganism(id: string)  {
    const query = new GetOrganism();
    query.id = id;
    return this.client.get(query);
  }

  getOrganisms() {
    const query = new GetAllOrganisms();
    return this.client.get(query);
  }
}
