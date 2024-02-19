import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jsonData from '../../assets/mock-data.json';
import { IItem } from '../models/item';
import { IRequest } from '../models/request';
import { IResponse } from '../models/response';
import { SEARCH_FILTER } from '../tools/constans';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private items$: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);
  private itemsMap = new Map<string, IItem[]>();

  constructor() {
    this.setData(jsonData); // Set initial data
  }

  getData(request: IRequest): Promise<IResponse> {
    let items$ = new BehaviorSubject<IItem[]>([]);
    let total = this.items$.value.length;
    // filter by search input
    if (request.filterValue.length >= 2) {
      items$.next(SEARCH_FILTER(this.items$.value, request.filterValue, []));
      total = items$.value.length;
    }
    // check if have local
    let arr = this.itemsMap.get(request.currentPage + '');
    if (arr?.length && !items$.value.length) {
      items$.next(arr);
    } else {
      // if no have local go to back
      // TODO return 11 index 0!!!
      let endIndex = request.currentPage * 10;
      let startIndex = endIndex - 10;
      items$.next(
        (items$.value.length ? items$.value : this.items$.value).slice(
          startIndex,
          endIndex - 1
        )
      );
      !request.filterValue.length &&
        this.itemsMap.set(request.currentPage + '', items$.value);
    }

    return new Promise<any>((resolve, reject) => {
      // Simulating an asynchronous operation
      const data = {
        total: total,
        list: items$.value,
      } as IResponse;
      resolve(data);
    });
  }

  private setData(data: IItem[]) {
    this.items$.next(data); // Emit new data
  }
}
