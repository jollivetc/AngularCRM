import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let numbers: string;
    let formatted = '';
    if (value) {
      formatted = numbers = value.replace(/\D/g, '').substring(0, 10); // keep numbers only
      if (numbers.length > 2) {
        formatted = `${numbers.slice(0, 2)} ${numbers.slice(2)}`;
        if (numbers.length > 4) {
          formatted = `${formatted.slice(0, 5)} ${formatted.slice(5)}`;
          if (numbers.length > 6) {
            formatted = `${formatted.slice(0, 8)} ${formatted.slice(8)}`;
            if (numbers.length > 8) {
              formatted = `${formatted.slice(0, 11)} ${formatted.slice(11)}`;
            }
          }
        }
      }
    }
    return formatted;
  }

}
