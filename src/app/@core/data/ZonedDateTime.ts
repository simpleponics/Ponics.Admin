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

  timezone: string;

  offset: string;

  private date: Date;

  constructor(date: Date) {
    this.date = date;
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();

    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    this.offset =
      (offset < 0 ? '+' : '-') +
      ('00' + Math.floor(o / 60)).slice(-2) +
      ':' +
      ('00' + (o % 60)).slice(-2);
  }

  public toString = (): string => {
    // 2017-12-26T19:41:21 Australia/Sydney (+11)
    return this.date.toISOString().substr(0, 19) + ' ' +
      this.timezone + ' (' +
      this.offset + ')';
  }
}
