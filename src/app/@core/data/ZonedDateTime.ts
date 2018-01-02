export class ZonedDateTime {
  /**
   * The hour, going from 0 to 23
   */
  hour: number;
  /**
   * The minute, going from 0 to 59
   */
  minute: number;
  /**
   * The second, going from 0 to 59
   */
  second: number;

  /**
   * The year, for example 2016
   */
  year: number;
  /**
   * The month, for example 1=Jan ... 12=Dec
   */
  month: number;
  /**
   * The day of month, starting at 1
   */
  day: number;

  /**
   * The the time zone
   */
  timezone: string;

  /**
   * The offset
   */
  offset: number;

  date: Date;

  toString(): string  {
    // 2017-12-26T19:41:21 Australia/Sydney (+11)
    return this.date.toISOString().substr(0, 19) + ' ' +
      this.timezone + ' (' +
      this.offset + ')';
  }

  static fromString(date: string): ZonedDateTime {
    const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}) (.*) \((.*)\)/g;
    const m = regex.exec(date);

    const zonedDateTime: ZonedDateTime = new ZonedDateTime();

    zonedDateTime.year = Number(m[1]);
    zonedDateTime.month = Number(m[2]);
    zonedDateTime.day = Number(m[3]);
    zonedDateTime.hour = Number(m[4]);
    zonedDateTime.minute = Number(m[5]);
    zonedDateTime.second = Number(m[6]);
    zonedDateTime.timezone = m[7];
    zonedDateTime.offset = Number(m[8]);

    zonedDateTime.date = new Date();
    zonedDateTime.date.setFullYear(zonedDateTime.year, zonedDateTime.month, zonedDateTime.day);
    zonedDateTime.date.setSeconds(zonedDateTime.second);
    zonedDateTime.date.setMinutes(zonedDateTime.minute);
    zonedDateTime.date.setHours(zonedDateTime.hour);
    return zonedDateTime;
  }

  static fromDate(date: Date): ZonedDateTime {
    const zonedDateTime: ZonedDateTime = new ZonedDateTime();
    zonedDateTime.date = date;
    zonedDateTime.hour = date.getHours();
    zonedDateTime.minute = date.getMinutes();
    zonedDateTime.second = date.getSeconds();
    zonedDateTime.year = date.getFullYear();
    zonedDateTime.month = date.getMonth() + 1;
    zonedDateTime.day = date.getDate();

    zonedDateTime.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    zonedDateTime.offset = Number(
      (offset < 0 ? '+' : '-') +
      ('00' + Math.floor(o / 60)).slice(-2) +
      ':' +
      ('00' + (o % 60)).slice(-2));

    return zonedDateTime;
  }
}
