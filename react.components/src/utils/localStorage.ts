class LocalStorage {
  setValue<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue<T = string>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
    return null;
  }
}

const localStorageModule = new LocalStorage();
export default localStorageModule;
