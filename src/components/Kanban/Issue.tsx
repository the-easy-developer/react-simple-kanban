import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import useDrag from '../../hooks/dnd/useDrag';
import { dragDataName } from './utils';

import type { IssueProps } from '../../types';

export default function Issue(props: IssueProps) {

  const { title, deleteHandler, tagKey } = props;

  const ref = useDrag(dragDataName, { title, tag: tagKey });

  return (
    <Box
      className="w-full h-[100px] border-2 rounded p-2 flex flex-col justify-between"
      ref={ref}
    >
      <Typography variant="h6">
        {title}
      </Typography>
      <Box className="flex justify-end">
        <IconButton onClick={deleteHandler} color='primary'>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
