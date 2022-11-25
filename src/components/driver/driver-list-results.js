import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

import { getInitials } from "../../utils/get-initials";

export const DriverListResults = ({ drivers, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>Nomor WA</TableCell>
                <TableCell>Berangkat</TableCell>
                <TableCell>Dari</TableCell>
                <TableCell>Tujuan</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow hover key={driver.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {driver.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{driver.wa_number}</TableCell>
                  <TableCell>{driver?.departure}</TableCell>
                  <TableCell>{`${driver.from?.kabupaten} - ${driver.from?.kecamatan}`}</TableCell>
                  <TableCell>{`${driver.to?.kabupaten} - ${driver.to?.kecamatan}`}</TableCell>
                  <TableCell>
                  <Button sx={{marginRight: '10px'}} size="small" variant="outlined"  color="warning" startIcon={<CreateIcon />}>
                      Edit
                    </Button>
                    <Button size="small" variant="outlined"  color="error" startIcon={<DeleteIcon />}>
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={drivers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

DriverListResults.propTypes = {
  drivers: PropTypes.array.isRequired,
};
