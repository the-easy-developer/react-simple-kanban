import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import type { CommonModalProps } from '../../types';

export default function CommonModal(props: CommonModalProps) {
  const {
    open,
    toggleOpen,
    children,
    title
  } = props;

  return (
    <Modal open={open} onClose={toggleOpen}>
      <Box
        sx={{ bgcolor: 'background.paper' }}
        className="relative p-5 h-[100%] sm:h-auto sm:w-[475px] sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-md flex flex-col"
      >
        <Box className="flex items-center border-b-2 border-b-[#eee] pb-1">
          <Typography variant="h4" className="flex-1"> {title} </Typography>
          <IconButton className="" onClick={toggleOpen}> <CloseIcon /> </IconButton>
        </Box>
        <Box className="mt-3 flex flex-col items-center flex-1 gap-2">
          {children}
        </Box>
      </Box>
    </Modal>
  );
}
