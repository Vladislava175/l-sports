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
import { Table, TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { SearchInputComponent } from '../../dynamic/search-input/search-input.component';
import { IItem } from '../../models/item';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ServiceService } from './../../services/service.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    SearchInputComponent,
    FormsModule,
    InputTextModule,
    FilterPipe,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, AfterViewInit {
  items$: Observable<IItem[]> = this.service.getData();
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

  ngOnInit() {}
  ngAfterViewInit(): void {
    this.table.currentPageReportTemplate =
      this.table.currentPageReportTemplate.replace(
        '{totalRecords}',
        this.totalRecords.toString()
      );
    this.cdref.detectChanges();
  }

  searchText() {}
}
