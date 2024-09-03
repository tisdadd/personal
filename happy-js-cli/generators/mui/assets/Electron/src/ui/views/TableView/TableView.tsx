import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useLog } from '../../contexts/LogContext';
import Table from '../../components/Table';

function TableView() {
  const [currentData, setCurrentData] = useState([]);

  const { log } = useLog();

  useEffect(
    () => {
      const dataRetrieval = async () => {
        const data = await window.electronAPI.getData();
        log(data);
        setCurrentData(data);
      };
      dataRetrieval();

      window.electronAPI.onDataUpdated((_event, data) => {
        log(data);
        setCurrentData(data);
      });
    },
    [log],
  );

  return (
    <Box>
      <Box>
        <Button
          onClick={() => {
            window.electronAPI.pickFile();
          }}
        >
          Pick A CSV to Create or Add to Table
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => {
            window.electronAPI.resetDatabase();
          }}
        >
          Clear the Database
        </Button>
      </Box>
      <Box>
        <Table
          data={currentData}
          onDataUpdate={(key, values) => {
            window.electronAPI.editData({ ...values, _id: key });
          }}
        />
      </Box>
    </Box>
  );
}

export default TableView;
