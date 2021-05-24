import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/api';

@Injectable({ providedIn: 'root' })
export class CategoriesResolver implements Resolve<string[]> {
  constructor(private service: CategoriesService) {}

  resolve(): Observable<string[]> {
    return this.service.getCategories();
  }
}
