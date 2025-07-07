import { IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

const CLIENT_COLUMNS = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Employee Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'salary', headerName: 'Salary', width: 200 },
  { field: 'mobile', headerName: 'Mobile', width: 200 },
  { field: 'address', headerName: 'Address', width: 200 },
  { 
    field: 'action', 
    headerName: 'Actions', 
    width: 140,
    renderCell: (params) => (
      <>
        {/* View Icon */}
        <IconButton 
          color="primary" 
          onClick={() => params.api.getRow(params.id) && console.log("View:", params.row)}
        >
          <Visibility />
        </IconButton>

        {/* Edit Icon */}
        <IconButton 
          color="secondary" 
          onClick={() => console.log("Edit:", params.row)}
        >
          <Edit />
        </IconButton>

        {/* Delete Icon */}
        <IconButton 
          color="error" 
          onClick={() => console.log("Delete:", params.row)}
        >
          <Delete />
        </IconButton>
      </>
    )
  }
];

export default CLIENT_COLUMNS;
