import { Injectable, InjectionToken, Inject } from '@angular/core';
import { StorageService } from 'ngx-webstorage-service';
// introducing our own injection token for storage
export const LOCAL_STORAGE_SERVICE =
  new InjectionToken<StorageService>('LOCAL_STORAGE_SERVICE');

@Injectable()
export default class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE_SERVICE) private storage: StorageService) { }

  public getKey(key: string) {
    return this.storage.get(key);
  }

  public setKey(STORAGE_KEY, val) {
    this.storage.set(STORAGE_KEY, val);
  }
}
