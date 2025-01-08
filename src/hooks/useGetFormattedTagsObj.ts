import { useMemo } from "react";

import { useStorageContext } from "../context/StorageContext";

function getFormatTagsObj(tagsList: string) {
  if (tagsList === '') {
    return {};
  }
  return tagsList.split(',').reduce((acc, tag) => {
    acc[tag] = tag.split('-').map(word => {
      const w = word.split('');
      return w.length ? w[0].toLocaleUpperCase() + w.slice(1).join('') : '';
    }).join(' ');
    return acc;
  }, {} as { [key: string]: string; });
}

export default function useGetFormattedTagsObj() {
  const { tags } = useStorageContext();

  const formattedTagsObj = useMemo(() => getFormatTagsObj(tags), [tags]);

  return formattedTagsObj;
}
