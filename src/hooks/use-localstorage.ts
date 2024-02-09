'use client';

export const useLocalStorage = () => {
  return {
    setItem: (k: string, v: string) => window.localStorage.setItem(k, v),
    getItem: (k: string) => window.localStorage.getItem(k),
  };
};
