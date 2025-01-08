import { string } from "yup";

export const tagSchema = string().test(
  "Valid Tag",
  "Tag can only consist of alphabets and hypen (-)",
  (value) => {
    return /^[a-zA-Z-]+$/.test(value!)
  });

export function getFormatTagsObj(tagsList: string) {
  return tagsList.split(',').reduce((acc, tag) => {
    acc[tag] = tag.split('-').map(word => {
      const w = word.split('');
      return w.length ? w[0].toLocaleUpperCase() + w.slice(1).join('') : '';
    }).join(' ');
    return acc;
  }, {} as { [key: string]: string; });
};
