import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { Table, TableModule } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';
import { IItem } from '../../models/item';
import { IRequest } from '../../models/request';
import { IResponse } from '../../models/response';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ServiceService } from './../../services/service.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    PaginatorModule,
    FilterPipe,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, AfterViewInit {
  items$: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);
  isLoading: boolean = false;
  rows: number = 10;
  loading: boolean = false;
  searchTextValue: string = '';
  totalRecords: number = 1000;
  cols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'country', header: 'Country' },
    { field: 'phone', header: 'Phone' },
    { field: 'email', header: 'Email' },
    { field: 'currency', header: 'Currency' },
  ];
  @ViewChild('table') table!: Table;
  constructor(
    private service: ServiceService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getData();
  }
  ngAfterViewInit(): void {
    this.table.currentPageReportTemplate =
      this.table.currentPageReportTemplate.replace(
        '{totalRecords}',
        this.totalRecords.toString()
      );
    this.cdref.detectChanges();
  }
  getData(currentPage: number = 1, filterValue: string = '') {
    this.isLoading = true;
    this.service
      .getData({ currentPage, filterValue } as IRequest)
      .then((res: IResponse) => {
        this.totalRecords = res.total;
        this.items$.next(res.list);
        this.isLoading = false;
      })
      .catch((e) => {
        console.error(e);
        this.isLoading = false;
      });
  }

  searchText() {
    console.log('event search', this.searchTextValue);
    this.getData(1, this.searchTextValue ?? '');
  }
  nextPage(event: any) {
    console.log('event next', event);
    this.getData(++event.page, '');
  }
}
