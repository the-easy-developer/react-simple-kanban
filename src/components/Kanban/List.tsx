import { useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Issue from './Issue';
import type { ListProps, DnDTransferData } from '../../types';
import { useStorageContext } from '../../context/StorageContext';
import { storageKeys } from '../../utils/storage';
import useDrop from '../../hooks/dnd/useDrop';
import { dragDataName } from './utils';

export default function List(props: ListProps) {

  const { title, issues, deleteIssue, tagKey } = props;

  const { updateStorage, issues: allIssues } = useStorageContext();

  const onDrop = useCallback((jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr) as DnDTransferData;

      if (data.tag === tagKey) {
        return;
      }

      updateStorage(storageKeys.issues, {
        ...allIssues,
        [data.tag]: allIssues[data.tag].filter(i => i !== data.title),
        [tagKey]: (allIssues[tagKey] ?? []).concat(data.title)
      });

    } catch (e) {
      console.error(e);
    }
  }, [allIssues, tagKey, updateStorage]);

  const ref = useDrop(dragDataName, onDrop);

  return (
    <Box
      className="h-full rounded-lg bg-[#fff] shrink-0 basis-[320px] max-w-[320px] p-2 flex flex-col gap-2"
      ref={ref}
    >
      <Typography variant="h5" className='border-b-2 break-words'> {title} </Typography>
      <Box className="flex-1 flex flex-col gap-2 overflow-auto">
        {
          issues.map((title) => (
            <Issue title={title} key={title} deleteHandler={() => deleteIssue(title)} tagKey={tagKey} />
          ))
        }
      </Box>
    </Box>
  );
}
