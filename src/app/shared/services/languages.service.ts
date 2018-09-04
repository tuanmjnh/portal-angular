import { Injectable } from '@angular/core';
import { Languages } from '../models/languages.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ConvertObject } from '@/../../src/app/shared/helpers/common';
@Injectable({ providedIn: 'root' })
export class LanguagesService {
  // readonly path = "languages";
  router = {
    path: 'languages',
    list: 'list',
    update: 'update'
    // pathList: `/${this.path}/list`,
    // pathUpdate: `/${this.path}/update`
  };
  items: Observable<Languages[]> = new Observable<Languages[]>();
  item: Languages = new Languages();
  constructor() {}
  select() {}
  selectRes() {}
  selectWithId() {}
  selectById(id: string) {}
  insert(model: Languages) {}
  update(id: string, model: Partial<Languages>): Promise<void> {
    return;
  }
  delete(id: string, model: Languages): Promise<void> {
    return;
  }
  remove(id: string): Promise<void> {
    return;
  }
}
