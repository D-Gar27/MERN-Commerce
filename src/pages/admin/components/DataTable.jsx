import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@material-ui/icons';
import axios from 'axios';

const productStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItem: 'center',
  gap: '1rem',
};

const handleDel = async (id) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API}/products/${id}`, {
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
    field: 'product',
    headerName: 'Product',
    width: 450,
    editable: true,
    renderCell: (params) => {
      return (
        <div className="user-list" style={productStyle}>
          <img
            src={params.row.img}
            alt="poster"
            style={{ width: '100%', objectFit: 'scale-down', maxWidth: '2rem' }}
          />
          <p>{params.row.product}</p>
        </div>
      );
    },
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    editable: true,
  },
  {
    field: 'size',
    headerName: 'Size',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action-btns">
          <button style={{ borderColor: 'cyan' }}>
            <Link to={'/admin/products/' + params.row._id}>
              <Edit style={{ color: 'cyan' }} />
            </Link>
          </button>
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

export default function DataTable({ data }) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        style={{ borderColor: 'black', paddingInline: '3vw' }}
        rows={data}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
        rowsPerPageOptions={[10]}
      />
      <Link to="/admin/products/create">
        <button className="create-btn">Upload New Product</button>
      </Link>
    </div>
  );
}
