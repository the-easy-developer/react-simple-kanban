import { string } from "yup";

export const tagSchema = string().test(
  "Valid Tag",
  "Tag can only consist of alphabets and hypen (-)",
  (value) => {
    return /^[a-zA-Z-]+$/.test(value!)
  });
