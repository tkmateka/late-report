import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  get(key: string, sessionType: string): any {
    let data = sessionType === 'session' ? sessionStorage.getItem(key) : localStorage.getItem(key);
    return data ? JSON.parse(data) : data;
  }

  getTimeFromDate(date: any): string {
    // ✅ get hours and minutes from the current Date
    const now = date;
    const hoursAndMinutes = now.getHours() + ':' + now.getMinutes();

    return hoursAndMinutes;
  }
}
