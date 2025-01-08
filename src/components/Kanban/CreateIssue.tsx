import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { ValidationError } from 'yup';
import { toast } from 'react-toastify';

import type { CreateIssueProps } from '../../types';
import { useStorageContext } from '../../context/StorageContext';
import { issueSchema } from './utils';
import { storageKeys } from '../../utils/storage';
import useGetFormattedTagsObj from '../../hooks/useGetFormattedTagsObj';
import CommonModal from '../common/Modal';

export default function CreateIssue(props: CreateIssueProps) {

  const { open, toggleOpen } = props;

  const [issueName, setIssueName] = useState('');
  const [tag, setTag] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const { issues, updateStorage } = useStorageContext();

  const formattedTagsObj = useGetFormattedTagsObj();

  const handleTagChange = async (event: SelectChangeEvent) => {
    const val = event.target.value as string;
    setTag(val);
  };

  const handleIssueNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setIssueName(val);
  };

  const closeError = (error: string) => setErrors(prev => prev.filter(p => p !== error));

  const createIssue = async () => {
    try {
      await issueSchema.validate({ tag, title: issueName }, { abortEarly: false });
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e, e.inner);
        setErrors(e.inner.map(i => i.errors).flat());
        return; // RETURNING ON ERROR
      }
    }

    setErrors([]);

    updateStorage(storageKeys.issues, {
      ...issues,
      [tag]: (issues[tag] ?? []).concat(issueName),
    });

    toggleOpen();

    toast.success("Issue created.", { autoClose: 3000 });

    setIssueName('');
    setTag('');
  };

  return (
    <CommonModal open={open} toggleOpen={toggleOpen} title="Create Issue">
      {
        !!errors.length && (
          <Box className='mt-1'>
            {errors.map(error => (
              <Alert key={error} severity='error' className='mt-1' onClose={() => closeError(error)}>
                {error}
              </Alert>
            ))}
          </Box>
        )
      }
      <TextField
        label="Issue name"
        classes={{ root: "w-full" }}
        value={issueName}
        onChange={handleIssueNameChange}
        error={false}
        helperText={""}
      />
      <FormControl fullWidth>
        <InputLabel> Tag </InputLabel>
        <Select label="Tag" onChange={handleTagChange} value={tag}>
          {
            Object.keys(formattedTagsObj).map(tagKey => (
              <MenuItem value={tagKey} key={tagKey}>
                {formattedTagsObj[tagKey]}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <Box className="flex w-full justify-end gap-1">
        <Button variant="contained" onClick={createIssue}> Add </Button>
        <Button onClick={toggleOpen}> Cancel </Button>
      </Box>
    </CommonModal>
  );
}
