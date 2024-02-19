import { Pipe, PipeTransform } from '@angular/core';
import { SEARCH_FILTER } from '../tools/constans';

@Pipe({
  name: 'searchFilter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string, keys?: string[]): any {
    return SEARCH_FILTER(items, filter?.trim(), keys || []);
  }
}
