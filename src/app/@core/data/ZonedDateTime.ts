import * as moment from 'moment-timezone';
import {Moment} from 'moment-timezone';
import {NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

export class ZonedDateTime {

  constructor(private m: Moment) {}

  toDate() {
    return this.m.toDate();
  }

  toString(): string {
    let offSet: any = this.m.utcOffset() / 60;
    if (offSet > 0) {
      offSet = '+' + offSet;
    }

    return this.m.format('YYYY-MM-DDTHH:mm:ss') + ' ' +
      this.m.tz() + ' (' +
      offSet + ')';
  }

  static fromString(date: string): ZonedDateTime {
    const dateArray: string[] = date.split(' ');
    const m = moment(dateArray[0]);
    m.tz(dateArray[1]);
    return new ZonedDateTime(m);
  }

  static fromDateAndTime(date: NgbDateStruct, time: NgbTimeStruct): ZonedDateTime {
    const zoneName =  moment.tz.guess();
    let m = moment.tz(zoneName);
    m = m.set({
      'year': date.year,
      'month': date.month - 1,
      'day': date.day,
      'hour' : time.hour,
      'minute' : time.minute,
    });
    return new ZonedDateTime(m);
  }
}
