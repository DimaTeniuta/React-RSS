export const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string): string | null {
      return store[key];
    },

    setItem(key: string, value: string): void {
      store[key] = value;
    },

    clear(): void {
      store = {};
    },
  };
})();
