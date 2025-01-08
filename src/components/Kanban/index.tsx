import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from "@mui/material/Typography";
import { toast } from 'react-toastify';

import List from "./List";
import CreateIssue from "./CreateIssue";
import useGetFormattedTagsObj from "../../hooks/useGetFormattedTagsObj";
import { useStorageContext } from "../../context/StorageContext";
import { storageKeys } from "../../utils/storage";

import './index.css';

export default function Kanban() {

  const [createIssueModalOpen, setCreateIssueModalOpen] = useState(false);

  const formattedTagsObj = useGetFormattedTagsObj();

  const { issues, updateStorage } = useStorageContext();

  const toggleCreateIssueModal = () => setCreateIssueModalOpen(prev => !prev);

  const deleteIssue = (tag: string) => (issue: string) => {
    updateStorage(storageKeys.issues, {
      ...issues,
      [tag]: issues[tag].filter(i => i !== issue),
    });

    toast.success("Issue deleted.", { autoClose: 3000 });
  };

  return (
    <>
      <Box className="flex-1 flex flex-col gap-1 p-2 min-h-0">
        <Box className="flex justify-end w-full">
          <Button variant="contained" startIcon={<AddCircleIcon />} onClick={toggleCreateIssueModal}> Create issue </Button>
        </Box>
        <Box className="flex-1 flex gap-2 min-h-0 min-w-0 overflow-x-auto">
          {
            Object.keys(formattedTagsObj).map(tagKey => (
              <List
                key={tagKey}
                title={formattedTagsObj[tagKey]}
                issues={issues[tagKey] ?? []}
                deleteIssue={deleteIssue(tagKey)}
                tagKey={tagKey}
              />
            ))
          }
          {
            !Object.keys(formattedTagsObj).length && (
              <Box className="w-full bg-[#fff] rounded-lg mt-1 p-2">
                <Typography variant="h4" className="border-b-4"> A simple kanban setup </Typography>

                <Box className="mt-2">
                  <Typography variant="subtitle1"> Follow the below steps: </Typography>
                  <ol className="starting-steps">
                    <li>
                      <Typography variant="subtitle2">
                        Start with creating a tag using the "Add tag" button at the top
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle2">
                        Once a tag is created you can add issues to it using the "Create issue" button
                      </Typography>
                    </li>
                  </ol>
                </Box>
              </Box>
            )
          }
        </Box>
      </Box>
      <CreateIssue open={createIssueModalOpen} toggleOpen={toggleCreateIssueModal} />
    </>
  );
}
