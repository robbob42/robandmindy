import { Injectable } from '@angular/core';
import { countries } from 'country-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }
  private languageCode = 'US';
  private countryCode: string;
  private currencyCode = 'USD';
  private robSubnavPosStylesSub = new BehaviorSubject({position: 'relative', top: 0});
  private robSubnavPosStyles = {position: 'relative', top: 0};

  initialize() {
    fetch('https://api.ipify.org?format=json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fetch(`http://ip-api.com/json/${data.ip}`)
        .then((response) => {
          return response.json();
        })
        .then((data2) => {
          const country = countries.all.find(countryList => countryList.alpha2 === data2.countryCode);
          this.countryCode = data2.countryCode || 'US';
          this.currencyCode = country.currencies[0] || 'USD';
          this.languageCode = navigator.language || 'en-US';
        });
      });
  }

  formatCurrency(amt: number): string {
    return Intl.NumberFormat(this.languageCode, {
      style: 'currency',
      currency: this.currencyCode,
      minimumFractionDigits: 2
    }).format(amt);
  }

  formatNumber(amt: number): string {
    return Intl.NumberFormat(this.languageCode).format(amt);
  }

  setNavPosStyles(posStyles: {position: string, top: number}) {
    this.robSubnavPosStyles = posStyles;
    this.robSubnavPosStylesSub.next(this.robSubnavPosStyles);
  }

  navPosStylesSubnavSub() {
    return this.robSubnavPosStylesSub;
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
