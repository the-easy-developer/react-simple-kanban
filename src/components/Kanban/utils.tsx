import { string, object } from "yup";

export const issueSchema = object({
  tag: string().required("Tag is required"),
  title: string().required("Issue name is required").test(
    "Valid Issue Title",
    "Issue name can only contain alphabets",
    (value) => {
      return /^([a-zA-Z0-9]+ *)*[a-zA-Z0-9]+$/.test(value!)
    })
});

export const dragDataName = "issue";
