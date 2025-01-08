import { createContext, ReactElement, useCallback, useContext, useEffect, useState } from "react";

import { retrieve, store } from "../utils/storage";

import type { StorageContextValueType, StorageKeysType } from "../types";

const defaultStorageContextValue: StorageContextValueType = { tags: '', issues: {}, updateStorage: () => undefined };

const StorageContext = createContext(defaultStorageContextValue);

export function StorageProvider({ children }: { children: ReactElement }) {

  const [localStorageDataMap, setLocalStorageDataMap] = useState(defaultStorageContextValue);

  useEffect(() => {
    const tagsVal = retrieve("tags");
    const issuesVal = retrieve("issues");

    setLocalStorageDataMap(prev => ({
      ...prev,
      tags: tagsVal ? tagsVal : prev.tags,
      issues: issuesVal ? issuesVal : prev.issues
    }));
  }, []);

  const updateStorage = useCallback(<T,>(storageKey: StorageKeysType, value: T) => {
    store(storageKey, value);
    setLocalStorageDataMap(prev => ({
      ...prev,
      [storageKey]: value
    }));
  }, []);

  return <StorageContext.Provider value={{ ...localStorageDataMap, updateStorage }}> {children} </StorageContext.Provider>;
}

export function useStorageContext() {
  return useContext(StorageContext);
}
