import React, { useState, useEffect } from 'react';

function TableList() {
  const [tableNames, setTableNames] = useState([]);
  const [status, setStatus] = useState('loading'); // add status state

  useEffect(() => {
    fetch('http://localhost:5000/tables')
      .then(response => response.json())
      .then(data => {
        setTableNames(data.tables);
        setStatus('loaded'); // set status to loaded
      })
      .catch(error => {
        console.error(error);
        setStatus('error'); // set status to error
      });
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  } else if (status === 'error') {
    return <div>Error fetching table names</div>;
  }

  return (
    <div>
      <h2>Table List</h2>
      <ul>
        {tableNames.map((tableName, index) => (
          <li key={index}>{tableName}</li>
        ))}
      </ul>
    </div>
  );
}

export default TableList;
