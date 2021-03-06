import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {JsonServiceClient} from 'servicestack-client';
import {LevelTypes} from './LevelTypes';
import {levelQueries} from './PonicsMaps';

@Injectable()
export class ToleranceAnalysisService {
  client: JsonServiceClient;
  constructor() {
    this.client =  new JsonServiceClient(environment.ponicsApi);
    this.client.bearerToken = localStorage.getItem('id_token');
  }
  analyseLevelReading(reading: number, levelType: LevelTypes, organismId: string) {
    const query = levelQueries.get(levelType);
    query.organismId = organismId;
    query.value = reading;
    return this.client.get(query);
  }
}
