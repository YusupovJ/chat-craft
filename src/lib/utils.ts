import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
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
  const minute = new Date(date).getMinutes().toString().padStart(2, "0");
  return `${hours}:${minute}`;
};

/* Sharing links */

const unsecuredCopyToClipboard = (text: string) => {
  const textArea = document.createElement("textarea");

  textArea.value = text;
  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    toast.success("Пригласительная ссылка скопирована", {
      description: "Отправьте тому кого хотите пригласить",
    });
  } catch (err) {
    console.error(err);
    toast.error("Не удалось скопировать текст");
  }

  document.body.removeChild(textArea);
};

export const shareLink = async () => {
  const url = window.location.href;

  try {
    await navigator.clipboard.writeText(url);

    toast.success("Пригласительная ссылка скопирована", {
      description: "Отправьте тому кого хотите пригласить",
    });
  } catch (error) {
    unsecuredCopyToClipboard(url);
    console.log("http copy", error);
  }
};
