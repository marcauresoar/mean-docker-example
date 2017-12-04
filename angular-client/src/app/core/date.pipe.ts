import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatted'
})
export class DatePipe implements PipeTransform {
  transform(value: string, exponent: string): string {
    const d = new Date(value);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }
}
