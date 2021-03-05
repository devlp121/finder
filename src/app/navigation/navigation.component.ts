import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NavigationComponent implements AfterViewInit {
  columnsToDisplay: string[] = ['item', 'lostType', 'phoneNumber', 'county'];
  exampleDatabase!: ExampleHttpDatabase | null;
  items!: Observable<any>
  dataSource = new MatTableDataSource();
  expandedElement!: ItemElement | null;


  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private afs: AngularFirestore) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this.afs);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getLostItems(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.length;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;

          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.items = data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}



export interface ItemElement {
  address: string;
  county:string;
  description:string;
  email:string;
  firstName:string;
  item:string;
  itemValue:string;
  lastName:string;
  lostType:string;
  phoneNumber:string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  private itemCol!: AngularFirestoreCollection
  items!: Observable<any>

  constructor(private afs: AngularFirestore) {
    
  }

  getLostItems(sort: string, order: string, page: number): Observable<any> {
    this.itemCol = this.afs.collection('items');
    this.items = this.itemCol.valueChanges()

    return this.items;
  }
}