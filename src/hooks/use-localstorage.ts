'use client';

export const useLocalStorage = () => {
  return {
    setItem: (key: string, value: string) => {
      window.localStorage.setItem(key, value);
    },
    getItem: (key: string) => {
      return window.localStorage.getItem(key);
    },
  };
};
