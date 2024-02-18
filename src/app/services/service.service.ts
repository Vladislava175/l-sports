import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jsonData from '../../assets/mock-data.json';
import { IItem } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private items$: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);

  constructor() {
    this.setData(jsonData); // Set initial data
  }

  getData() {
    return this.items$.asObservable(); // Return as an Observable
  }

  private setData(data: IItem[]) {
    this.items$.next(data); // Emit new data
  }
}