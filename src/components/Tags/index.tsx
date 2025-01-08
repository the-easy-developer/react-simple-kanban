import { useState } from "react";
import { toast } from 'react-toastify';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Chip from '@mui/material/Chip';

import AddTag from "./AddTag";
import { useStorageContext } from "../../context/StorageContext";
import { storageKeys } from "../../utils/storage";
import useGetFormattedTagsObj from "../../hooks/useGetFormattedTagsObj";

export default function Tags() {

  const [addTagModalOpen, setAddTagModalOpen] = useState(false);

  const { tags: tagsList, updateStorage, issues } = useStorageContext();

  const formattedTagsObj = useGetFormattedTagsObj();

  const toggleAddTagModalOpen = () => setAddTagModalOpen(prev => !prev);

  const handleTagDelete = (tag: string) => () => {
    if (issues[tag]?.length) {
      toast.warn("There are issues associated with this tag. Can't delete.", { autoClose: 5000 });
    } else {
      updateStorage(storageKeys.tags, tagsList.split(',').filter(t => t !== tag).join(','));

      const newIssues = { ...issues };

      delete newIssues[tag];

      updateStorage(storageKeys.issues, newIssues);
    }
  };

  return (
    <>
      <Box className="w-full flex p-2 items-center">
        <Box className="flex gap-1 flex-wrap flex-1 max-h-[70px] overflow-auto">
          {Object.keys(formattedTagsObj).map(tagKey => (
            <Chip
              key={tagKey}
              color="primary"
              variant="outlined"
              label={formattedTagsObj[tagKey]}
              onDelete={handleTagDelete(tagKey)}
            />
          ))}
        </Box>
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={toggleAddTagModalOpen}>
          Add tag
        </Button>
      </Box>
      <AddTag open={addTagModalOpen} toggleOpen={toggleAddTagModalOpen} />
    </>
  );
}
