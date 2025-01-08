import Box from '@mui/material/Box';
import { ToastContainer } from 'react-toastify';

import Tags from './components/Tags';
import Kanban from './components/Kanban';

import { StorageProvider } from './context/StorageContext';

import './App.css'

function App() {

  return (
    <StorageProvider>
      <Box className="flex flex-col h-[100%] bg-[#ebf5fc] ">
        <Tags />
        <Kanban />
        <ToastContainer position='top-right' />
      </Box>
    </StorageProvider>
  );
}

export default App
