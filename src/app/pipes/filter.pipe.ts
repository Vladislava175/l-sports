import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string, keys?: string[]): any {
    return this.filter(items, filter?.trim(), keys || []);
  }

  filter(items: any[], query: string, keys: string[]) {
    if (!query || typeof query !== 'string' || !items) return items;

    const find: any = (item: any) => {
      if (item) {
        return Object.entries(item).find(
          ([key, value]) =>
            (((keys.length && keys.includes(key)) || !keys.length) &&
              !key.endsWith('Id') &&
              typeof value === 'string' &&
              (!!value.match(new RegExp(query, 'i')) ||
                !!value.replace(/'|י|`/g, '').match(new RegExp(query, 'i')))) ||
            (typeof value === 'object' && find(value))
        );
      } else {
        return;
      }
    };

    return [...items.filter((item) => find(item))];
  }
}
