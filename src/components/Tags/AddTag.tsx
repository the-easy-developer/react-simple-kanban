import { useState } from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { tagSchema } from './utils';
import { useStorageContext } from "../../context/StorageContext";
import { storageKeys } from '../../utils/storage';
import type { AddTagProps } from '../../types';
import CommonModal from '../common/Modal';

export default function AddTag(props: AddTagProps) {
  const {
    open,
    toggleOpen
  } = props;

  const [tagValue, setTagValue] = useState('');
  const [invalidTagMessage, setInvalidTagMessage] = useState('');

  const { updateStorage, tags } = useStorageContext();

  const storeTag = () => {
    updateStorage(storageKeys.tags, tags ? `${tags},${tagValue}` : tagValue);
    toggleOpen();
    toast.success("Tag added", { autoClose: 3000 });
    setTagValue('');
  };

  const updateTagValue = async (val: string) => {
    setTagValue(val);
    try {
      await tagSchema.validate(val);
      setInvalidTagMessage("");
    } catch (e) {
      setInvalidTagMessage(typeof e === 'string' ? e : e instanceof Error ? e.message : "Something went wrong");
    }
  };

  return (
    <CommonModal open={open} toggleOpen={toggleOpen} title="Add tags">
      <TextField
        label="Tag name"
        classes={{ root: "w-full" }}
        value={tagValue}
        onChange={(e) => updateTagValue(e.currentTarget.value)}
        error={Boolean(invalidTagMessage)}
        helperText={invalidTagMessage ?? ""}
      />
      <Box className="flex w-full justify-end gap-1">
        <Button variant="contained" onClick={storeTag} disabled={!tagValue || !!invalidTagMessage}> Add </Button>
        <Button onClick={toggleOpen}> Cancel </Button>
      </Box>
    </CommonModal>
  );
}
