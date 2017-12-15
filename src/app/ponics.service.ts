import {EventEmitter, Injectable} from '@angular/core';
import {
  AddComponent,
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
  GetSystem, UpdateSystem
} from './Ponics.Api.dtos';
import {JsonServiceClient} from 'servicestack-client';

@Injectable()
export class PonicsService {
  systemAdded = new EventEmitter<AquaponicSystem>();
  componentAdded = new EventEmitter<Component>();
  systemUpdated = new EventEmitter<AquaponicSystem>();

  public organismAdded = new EventEmitter<Component>();

  levelQueries: Map<string, any> = new Map([
    ['Salinity', new AnalyseSalinity()],
    ['Iron', new AnalyseIron()],
    ['Nitrate', new AnalyseNitrate()],
    ['Nitrite', new AnalyseNitrite()],
    ['Ammonia', new AnalyseAmmonia],
    ['pH', new AnalysePh()],
  ]);

  client = new JsonServiceClient('http://localhost:51272/');

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

  updatedAquaponicSystem(system: AquaponicSystem) {
    const command = new UpdateSystem();
    command.id = system.id;
    command.system = system;
    this.client.post(command).then(r =>
      this.systemUpdated.emit(system),
    );
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

  addComponent(systemId: string, component: Component)
  {
    const command = new AddComponent();
    command.systemId = systemId;
    command.component = component;
    this.client.post(command)
      .then(r =>
        this.componentAdded.emit(component),
      );
  }
}
