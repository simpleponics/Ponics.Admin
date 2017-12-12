import {EventEmitter, Injectable} from '@angular/core';
import {AddSystem, AquaponicSystem, GetAllSystems} from './Ponics.Api.dtos';
import {JsonServiceClient} from 'servicestack-client';

@Injectable()
export class PonicsService {
  systemAdded = new EventEmitter<AquaponicSystem>();

  client = new JsonServiceClient('http://localhost:51272/');

  getAquaponicSystems() {
    const query = new GetAllSystems();
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
}
