import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { Delete } from '@material-ui/icons';

const productStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItem: 'center',
  gap: '1rem',
  width: '100%',
};

const handleDel = async (id) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API}/users/${id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('x_3')}` },
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const columns = [
  { field: '_id', headerName: 'ID', width: 200 },
  {
    field: 'username',
    headerName: 'User',
    width: 300,
    editable: true,
    renderCell: (params) => {
      return (
        <div className="user-list" style={productStyle}>
          <p>{params.row.username}</p>
        </div>
      );
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    editable: true,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action-btns">
          <button
            onClick={() => handleDel(params.row._id)}
            style={{ borderColor: 'red' }}
          >
            <Delete style={{ color: 'red' }} />
          </button>
        </div>
      );
    },
  },
];

export default function UsersDataTable({ data }) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        style={{ borderColor: 'black', paddingInline: '3vw' }}
        rows={data}
        columns={columns}
        rowsPerPageOptions={[10]}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />
    </div>
  );
}
