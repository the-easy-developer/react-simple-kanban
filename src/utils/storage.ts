import type { StorageKeysType } from "../types";

export const storageKeys: { [key: string]: StorageKeysType; } = {
  tags: "tags",
  issues: "issues"
};

export function store(key: string, data: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function retrieve(key: string) {
  try {
    return JSON.parse(window.localStorage.getItem(key)!);
  } catch (e) {
    console.error(e);
    return false;
  }
}

