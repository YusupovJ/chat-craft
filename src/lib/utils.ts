import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/* Merge classNames */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* Local storage control */

type TKeyLocalstorage = "accessToken" | "refreshToken";

export const getLocalStorage = (key: TKeyLocalstorage): string | null => {
  return localStorage.getItem(key);
};

export const setLocalStorage = (key: TKeyLocalstorage, value: string): void => {
  localStorage.setItem(key, value);
};

export const delLocalStorage = (...keys: TKeyLocalstorage[]) => {
  if (Array.isArray(keys)) {
    keys.forEach((key) => localStorage.removeItem(key));
  }
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

/* Date */

export const localeDate = (date: string) => {
  const hours = new Date(date).getHours();
  const minute = new Date(date).getMinutes();
  return `${hours}:${minute}`;
};
