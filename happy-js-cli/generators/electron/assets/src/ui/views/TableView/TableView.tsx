import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div>
      <div>
        <div style={{ textAlign: 'center' }}><Link to="/react-default">See Default React View</Link></div>
        <button
          type="button"
          onClick={() => {
            window.electronAPI.pickFile();
          }}
        >
          Pick A CSV to Create or Add to Table
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            window.electronAPI.resetDatabase();
          }}
        >
          Clear the Database
        </button>
      </div>
      <div>
        <Table
          data={currentData}
          onDataUpdate={(key, values) => {
            window.electronAPI.editData({ ...values, _id: key });
          }}
        />
      </div>
    </div>
  );
}

export default TableView;
