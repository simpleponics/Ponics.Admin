import {EventEmitter, Injectable} from '@angular/core';
import {
  AddComponent, AddLevelReading,
  AddSystem, AnalysePonicsSystem,
  AquaponicSystem,
  Component,
  DeleteComponent,
  DeleteSystem,
  GetAllSystems,
  GetSystem,
  GetSystemLevels,
  GetSystemOrganisms,
  LevelReading,
  UpdateComponent,
  UpdateSystem,
} from './Ponics.Api.dtos';
import {JsonServiceClient} from 'servicestack-client';
import {environment} from '../../../environments/environment';

@Injectable()
export class PonicsService {
  systemAdded = new EventEmitter<AquaponicSystem>();
  systemUpdated = new EventEmitter<AquaponicSystem>();
  systemDeleted = new EventEmitter<void>();

  componentAdded = new EventEmitter<Component>();
  componentUpdated = new EventEmitter<Component>();
  componentDeleted = new EventEmitter<void>();

  levelReadingsAdded = new EventEmitter<string>();
  addingLevelReadings = new EventEmitter<Promise<void>>();

  client = new JsonServiceClient(environment.ponicsApi);

  getAquaponicSystems() {
    const query = new GetAllSystems();
    return this.client.get(query);
  }

  getAquaponicSystem(id: string) {
    const query = new GetSystem();
    query.systemId = id;
    return this.client.get(query);
  }

  getAquaponicSystemOrganisms(id: string) {
    const query = new GetSystemOrganisms();
    query.systemId = id;
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

  updateComponent(systemId: string, component: Component) {
    const command = new UpdateComponent();
    command.systemId = systemId;
    command.componentId = component.id;
    command.component = component;
    const promise = this.client.post(command);
    promise.then(r =>
      this.componentUpdated.emit(component),
    );
    return promise;
  }

  deleteComponent(systemId: string, componentId: string) {
    const command = new DeleteComponent();
    command.systemId = systemId;
    command.componentId = componentId;
    const promise = this.client.delete(command);
    promise.then(() =>
      this.componentDeleted.emit(),
    );
    return promise;
  }

  updateAquaponicSystem(system: AquaponicSystem) {
    const command = new UpdateSystem();
    command.systemId = system.id;
    command.system = system;
    const promise = this.client.post(command);
    promise.then(r =>
      this.systemUpdated.emit(system),
    );

    return promise;
  }

  addLevelReadings(systemId: string, levelReadings: LevelReading[] ) {
    const command = new AddLevelReading();
    command.systemId = systemId;
    command.levelReadings = levelReadings;
    const promise = this.client.post(command);

    promise.then(r =>
      this.levelReadingsAdded.emit(systemId),
    );

    this.addingLevelReadings.emit(promise);
    return promise;
  }

  getLevelReadings(systemId: string, levelType: string  ) {
    const query = new GetSystemLevels();
    query.systemId = systemId;
    query.type = levelType;
    return this.client.get(query);
  }

  getSystemAnalysis(systemId: string) {
    const query = new AnalysePonicsSystem();
    query.systemId = systemId;
    return this.client.get(query);
  }

  deleteSystem(systemId: string) {
    const command = new DeleteSystem();
    command.systemId = systemId;
    const promise = this.client.delete(command);
    promise.then(() =>
      this.systemDeleted.emit(),
    );
    return promise;
  }
}

