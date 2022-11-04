import { Pipe, PipeTransform } from '@angular/core';
import { PastOrFuture } from '../enums/past-or-future';
import { Match } from '../interfaces/match';
import { Matchday } from '../interfaces/matchday';

@Pipe({
  name: 'pastOrFuture',
})
export class PastOrFuturePipe implements PipeTransform {
  transform(matchdays: Matchday[], ...pastOrFuture: any[]): Matchday[] {
    if (!matchdays || !pastOrFuture) {
      return matchdays;
    }

    if (pastOrFuture[0] == PastOrFuture.PAST)
      return matchdays.filter((matchday) => matchday.date < new Date());

    if (pastOrFuture[0] == PastOrFuture.FUTURE)
      return matchdays.filter((matchday) => matchday.date >= new Date());

    return matchdays;
  }
}
