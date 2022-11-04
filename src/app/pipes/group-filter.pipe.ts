import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../interfaces/match';

@Pipe({
  name: 'groupFilter',
})
export class GroupFilterPipe implements PipeTransform {
  transform(items: Match[], filter: number[]): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item) => filter.includes(item.groupId));
  }
}
