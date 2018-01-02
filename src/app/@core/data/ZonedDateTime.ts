import * as moment from 'moment-timezone';
import {Moment} from 'moment';

export class ZonedDateTime  {
  static fromString(date: string): Moment {
    const dateArray: string[] = date.split(' ');
    const m = moment(dateArray[0]);
    m.tz(dateArray[0]);
    return m;
  }

  static fromDate(date: Date): Moment {
    return moment(date);
  }
}
