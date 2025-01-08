import type { ReactNode } from "react";

export type IssueType = string;

export type StorageContextValueType = {
  tags: string;
  issues: { [key: string]: IssueType[] };
  updateStorage: <T, >(s: StorageKeysType, a: T) => void;
};

export type StorageKeysType = keyof Omit<StorageContextValueType, 'updateStorage'>;

export type IssueProps = {
  title: string;
  deleteHandler: () => void;
  tagKey: string;
};

export type AddTagProps = {
  open: boolean;
  toggleOpen: () => void;
}

export type CreateIssueProps = {
  open: boolean;
  toggleOpen: () => void;
};

export type ListProps = {
  title: string;
  issues: IssueType[];
  deleteIssue: (issue: string) => void;
  tagKey: string;
};

export type DnDTransferData = {
  title: string;
  tag: string;
};

export type CommonModalProps = {
  open: boolean;
  toggleOpen: () => void;
  children: ReactNode;
  title: string;
};
