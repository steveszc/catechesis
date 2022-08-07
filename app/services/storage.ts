import Service from '@ember/service';
import { cached, tracked } from '@glimmer/tracking';

export default class StorageService extends Service {
  public read(key: string) {
    return this.storedData[key];
  }
  public write(key: string, value: unknown) {
    let newData = { [key]: value };
    this.storedData = { ...this.storedData, ...newData };
  }
  public clear() {
    this.storedData = {};
  }

  private storageKey = 'catechesis';

  @cached
  private get storage() {
    if (this.isLocalStorageAvailable()) {
      return window.localStorage;
    }

    return undefined;
  }

  @tracked private ephemeralStore = '{}';
  @tracked private ref = 0; // autotracking

  get storedData() {
    this.ref; // autotracking

    let stored = this.storage
      ? this.storage.getItem(this.storageKey)
      : this.ephemeralStore;
    let data = JSON.parse(stored || '{}');

    return data;
  }

  set storedData(data: Record<string, unknown>) {
    let toStore = JSON.stringify(data);

    if (this.storage) {
      this.storage.setItem(this.storageKey, toStore);
    } else {
      this.ephemeralStore = toStore;
    }

    this.ref++; // autotracking
  }

  isLocalStorageAvailable() {
    let storage;
    try {
      storage = window.localStorage;
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }
}
