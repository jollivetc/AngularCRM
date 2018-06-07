import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log('PhonePipe.transform', value, args);
    let number, formatted = null;
    if (value) {
      formatted = number = value.replace(/\D/g, '').substring(0, 10); // keep numbers only
      if (number.length > 2) {
        formatted = `${number.slice(0, 2)} ${number.slice(2)}`;
        if (number.length > 4) {
          formatted = `${formatted.slice(0, 5)} ${formatted.slice(5)}`;
          if (number.length > 6) {
            formatted = `${formatted.slice(0, 8)} ${formatted.slice(8)}`;
            if (number.length > 8) {
              formatted = `${formatted.slice(0, 11)} ${formatted.slice(11)}`;
            }
          }
        }
      }
    }
    return formatted;
  }

}
