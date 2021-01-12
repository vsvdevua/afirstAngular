import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe extends DatePipe implements PipeTransform {

  // @ts-ignore
  transform(date: Date | string, format: string = 'mediumDate'): string {
    if (date == null){
      return 'without date';
    }
    date = new Date(date);
    const currentDate = new Date().getDate();
    if (date.getDate() === currentDate){
      return 'Today';
    }
    if (date.getDate() === currentDate - 1){
      return 'Yesterday';
    }
    if (date.getDate() === currentDate + 1){
      return 'Tomorrow';
    }
    return new DatePipe('ru-RU').transform(date, format);
  }

}
