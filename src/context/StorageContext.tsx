import { createContext, ReactElement, useCallback, useState, use } from "react";

import { retrieve, store } from "../utils/storage";

import type { StorageContextValueType, StorageKeysType } from "../types";

const defaultStorageContextValue: StorageContextValueType = { tags: '', issues: {}, updateStorage: () => undefined };

const StorageContext = createContext(defaultStorageContextValue);

const tagsVal = retrieve("tags");
const issuesVal = retrieve("issues");

export function StorageProvider({ children }: { children: ReactElement }) {

  const [localStorageDataMap, setLocalStorageDataMap] = useState({
    ...defaultStorageContextValue,
    tags: tagsVal ? tagsVal : defaultStorageContextValue.tags,
    issues: issuesVal ? issuesVal : defaultStorageContextValue.issues
  });

  const updateStorage = useCallback(<T,>(storageKey: StorageKeysType, value: T) => {
    store(storageKey, value);
    setLocalStorageDataMap(prev => ({
      ...prev,
      [storageKey]: value
    }));
  }, []);

  return <StorageContext value={{ ...localStorageDataMap, updateStorage }}> {children} </StorageContext>;
}

export function useStorageContext() {
  return use(StorageContext);
}
