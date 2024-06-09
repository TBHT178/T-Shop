import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] = [];

    for(let theMonth = startMonth; theMonth<= 12; theMonth++){
      data.push(theMonth);
    }

    // "of" operator from rxjs, wrap an object as am Observable
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear = startYear + 10;

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    // "of" operator from rxjs, wrap an object as am Observable
    return of(data);
  }
}
