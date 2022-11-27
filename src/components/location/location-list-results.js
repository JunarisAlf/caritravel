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
import DeleteConfirmation from "./delete-confirmation";
import { UpdateLocationModal } from "./update-location-modal";
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
export const LocationListResults = ({ locations, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [updateOpen, setUpdateOpen] = useState(false);

  const [confirOpen, setConfirOpen] = useState(false);
  const [confirAtr, setConfirAtr] = useState("");
  const [locID, setLocID] = useState();
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <DeleteConfirmation
        setOpen={setConfirOpen}
        open={confirOpen}
        confirAtr={confirAtr}
        {...rest}
      />

      <Modal 
        open={updateOpen} 
        onClose={() => setUpdateOpen(false)} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <UpdateLocationModal locID={locID} open={updateOpen} setOpen={setUpdateOpen} {...rest} />
        </Box>
      </Modal>

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Kabupaten</TableCell>
                <TableCell>Kecamatan</TableCell>
                <TableCell>Catatan</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((loc) => (
                <TableRow hover key={loc.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {loc.kabupaten}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{loc.kecamatan}</TableCell>
                  <TableCell>{loc?.catatan}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setUpdateOpen(true);
                        setLocID(loc.id);
                      }}
                      sx={{ marginRight: "10px" }}
                      size="small"
                      variant="outlined"
                      color="warning"
                      startIcon={<CreateIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setConfirOpen(true);
                        setConfirAtr({ kecamatan: loc.kecamatan, id: loc.id });
                      }}
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
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
        count={locations.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

LocationListResults.propTypes = {
  locations: PropTypes.array,
};
