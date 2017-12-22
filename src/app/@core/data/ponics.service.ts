import {EventEmitter, Injectable} from '@angular/core';
import {
  AddComponent,
  AddSystem,
  AquaponicSystem,
  Component,
  GetAllSystems,
  GetSystem,
  UpdateSystem,
} from './Ponics.Api.dtos';
import {JsonServiceClient} from 'servicestack-client';
import {environment} from '../../../environments/environment';

@Injectable()
export class PonicsService {
  systemAdded = new EventEmitter<AquaponicSystem>();
  componentAdded = new EventEmitter<Component>();
  systemUpdated = new EventEmitter<AquaponicSystem>();

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



  deleteSystem(systemId: string) {
  }

  deleteOrganism(organism: string) {
  }


}

