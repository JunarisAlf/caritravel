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
  Modal,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { UpdateOrderModal } from "./update-order-modal";
import { getInitials } from "../../utils/get-initials";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const OrderListResults = ({ orders, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [confirOpen, setConfirOpen] = useState(false);
  const [confirAtr, setConfirAtr] = useState("");
  const [orderID, setOrderID] = useState();
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <Modal 
        open={updateOpen} 
        onClose={() => setUpdateOpen(false)} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <UpdateOrderModal orderID={orderID} open={updateOpen} setOpen={setUpdateOpen} {...rest} />
        </Box>
      </Modal>

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Driver</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Asal</TableCell>
                <TableCell>Tujuan</TableCell>
                <TableCell>Waktu</TableCell>
                <TableCell>Catatan</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>
                    {order.Driver.name}
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.Admin.name}</TableCell>
                  <TableCell>{order.location_from.kabupaten + ' - ' + order.location_from.kecamatan}</TableCell>
                  <TableCell>{order.to.kabupaten + ' - ' + order.to.kecamatan}</TableCell>
                  <TableCell>{order.departure}</TableCell>
                  <TableCell>{order.catatan}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setUpdateOpen(true);
                        setOrderID(order.id);
                      }}
                      sx={{ marginRight: "10px" }}
                      size="small"
                      variant="outlined"
                      color="warning"
                      startIcon={<CreateIcon />}
                    >
                      Edit
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
        count={orders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrderListResults.propTypes = {
  orders: PropTypes.array,
};
