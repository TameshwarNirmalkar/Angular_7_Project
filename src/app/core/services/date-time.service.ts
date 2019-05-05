import { Injectable } from '@angular/core';
import { CustomTranslateService } from './custom-translate.service';

declare var moment: any;

@Injectable()
export class DateTimeService {
  public currentISTtime: any;
  constructor(private customTranslateService: CustomTranslateService) { }

  getDisabledDates(): string[] {
    const dates: string[]  = ['01-02-2017', '10-02-2017', '14-02-2017',
    '24-02-2017', '12-03-2017', '28-03-2017', '03-06-2017', '04-06-2017', '05-06-2017', '06-06-2017'];
    return dates;
  }

  getDisabledWeekDays(): number[] {
    let days: number[] = [];
    days = [0, 7];
    return days;
  }

  getHighlightedDates(): any[] {
    const dates = [
      {
        event_date: '13-09-2017',
        event_desc: ['HONG KONG GEM & JEWELLERY FAIR']
      },
      {
        event_date: '14-09-2017',
        event_desc: ['HONG KONG GEM & JEWELLERY FAIR']
      },
      {
        event_date: '15-09-2017',
        event_desc: ['HONG KONG GEM & JEWELLERY FAIR']
      },
      {
        event_date: '16-09-2017',
        event_desc: ['HONG KONG GEM & JEWELLERY FAIR']
      },
      {
        event_date: '17-09-2017',
        event_desc: ['HONG KONG GEM & JEWELLERY FAIR']
      },
      {
        event_date: '08-06-2017',
        event_desc: ['JCK LAS VEGAS SHOW']
      },
      {
        event_date: '22-06-2017',
        event_desc: ['Hong Kong Jewellery & Gem Fair']
      },
      {
        event_date: '23-06-2017',
        event_desc: ['Hong Kong Jewellery & Gem Fair']
      },
      {
        event_date: '24-06-2017',
        event_desc: ['Hong Kong Jewellery & Gem Fair']
      },
      {
        event_date: '25-06-2017',
        event_desc: ['Hong Kong Jewellery & Gem Fair']
      }
    ];
    return dates;
  }

  getAllowTimes(): string[] {
    let times: string[] = [];
    times = this.getTimesFromServer();
    // times = this.convertAllTimesInLocalHours(times);
    return times;
  }

  getAllowTimesSaturday() {
    return ['09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00',
      '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45',
      '15:00'];
  }

  getTimesFromServer(): any[] {
    return ['09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00',
      '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45',
      '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00',
      '17:15', '17:30'];
  }

  getVisitingTime(): any[] {
    return ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00',
      '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45',
      '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00',
      '17:15'];
  }

  getVisitingTimeSaturday() {
    return ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00',
      '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45'];
  }

  convertAllTimesInLocalHours(times: any[]): any[] {
    const localTimes: any[] = [];
    for (let x = 0; x <= times.length; x++) {
      if (times[x] !== undefined && times[x] !== null) {
        const localTime: any = moment(times[x], 'HH:mm:ssTZD');
        const hoursMin = localTime.hours() + ':' + localTime.minutes();
        localTimes.push(hoursMin);
      }
    }
    return localTimes;
  }

  getISTtime() {

    return this.currentISTtime;
  }

}
