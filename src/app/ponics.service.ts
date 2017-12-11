import {EventEmitter, Injectable} from '@angular/core';
import {AddSystem, AquaponicSystem, GetAllSystems} from './Ponics.Api.dtos';
import {JsonServiceClient} from 'servicestack-client';

@Injectable()
export class PonicsService {
  private systems: AquaponicSystem[] = [];
  systemAdded = new EventEmitter<AquaponicSystem>();

  client = new JsonServiceClient('http://localhost:51272/');

  getSystems() {
    return this.systems.slice();
  }

  getAquaponicSystems() {
    const query = new GetAllSystems();

    this.client.get(query)
      .then(r =>
        this.systems = r
      );
  }

  addAquaponicSystem(system: AquaponicSystem) {
    const command = new AddSystem();
    command.system = system;
    this.client.post(command)
      .then(r =>
        this.systemAdded.emit(system)
      );
  }

  constructor() {
    const test = new AquaponicSystem();
    test.name = 'Test';
    test.id = 'test';
    this.systems.push(test);
  }
}
