import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const DataTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // TABLE
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    let row = { ...data[0] };

    let cols = [
      { id: 'id', Name: 'id', minWidth: 150 },
      { id: 'productName', Name: 'Name', minWidth: 150 },
      { id: 'productDesc', Name: 'Desc', minWidth: 150 },
      { id: 'productCost', Name: 'Cost', minWidth: 150 },
      { id: 'productInventory', Name: 'Inventory', minWidth: 150 },
      { id: 'productStatus', Name: 'Status', minWidth: 150 },
      { id: 'productModified', Name: 'Modified', minWidth: 150 },
    ];

    delete row.id;
    delete row._id;
    delete row.productName;
    delete row.productDesc;
    delete row.productCost;
    delete row.productInventory;
    delete row.productStatus;
    delete row.productModified;

    let appends = [];
    for (const [key, value] of Object.entries(row)) {
      const col = {
        id: key,
        Name: key.replace('product', ''),
        minWidth: 150,
      };

      appends.push(col);
    }

    appends.sort((a, b) => (a < b ? 1 : -1));
    cols.splice(3, 0, ...appends);

    setColumns(cols);
  }, [data]);
  //\ TABLE

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: 12,
                    backgroundColor: '#555',
                    color: 'white',
                  }}
                >
                  {column.Name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ fontSize: 12 }}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
