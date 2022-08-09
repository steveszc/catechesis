import { cached, tracked } from '@glimmer/tracking';

type DecoratorPropertyDescriptor =
  | (PropertyDescriptor & { initializer?: any })
  | undefined;
type StorageName = 'localStorage' | 'sessionStorage';

export default function stored(
  target: object,
  propertyName: string,
  desc?: DecoratorPropertyDescriptor
) {
  const defaultValue = desc?.initializer?.();
  const namespace = target.constructor.name;
  const key = namespace + '_' + String(propertyName);
  const store = new Storage(key);

  return <any>{
    get() {
      return store.read() ?? defaultValue;
    },

    set(value: unknown) {
      return store.write(value);
    },
  };
}

class Storage {
  constructor(private key: string, private storageName?: StorageName) {}

  public read() {
    return this.storedData[this.key];
  }
  public write(value: unknown) {
    let newData = { [this.key]: value };
    this.storedData = { ...this.storedData, ...newData };
  }
  public clear() {
    this.storedData = {};
  }

  private get validatedStorageName(): StorageName {
    return this.storageName === 'localStorage' ||
      this.storageName === 'sessionStorage'
      ? this.storageName
      : 'localStorage';
  }

  @cached
  private get storage() {
    if (this.isStorageAvailable(this.validatedStorageName)) {
      return window[this.validatedStorageName];
    }

    return undefined;
  }

  @tracked private ephemeralStore = '{}';
  @tracked private ref = 0; // autotracking

  get storedData() {
    this.ref; // autotracking

    let stored = this.storage
      ? this.storage.getItem(this.key)
      : this.ephemeralStore;
    let data = JSON.parse(stored || '{}');

    return data;
  }

  set storedData(data: Record<string, unknown>) {
    let dataToStore = JSON.stringify(data);

    if (this.storage) {
      this.storage.setItem(this.key, dataToStore);
    } else {
      this.ephemeralStore = dataToStore;
    }

    this.ref++; // autotracking
  }

  isStorageAvailable(storageName: StorageName) {
    let storage;
    try {
      storage = window[storageName];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        typeof DOMException !== 'undefined' &&
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
