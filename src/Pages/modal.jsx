import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Define styles for the modal container
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 }, // Responsive width
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  color: "orange",
  p: 4,
};

const ReusableModal = ({ open, handleClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={modalStyle}>
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Modal Title */}
        {title && (
          <Typography
            // id="modal-title"
            variant="h6"
            component="h2"
            mb={2}
            
          >
            {title}
          </Typography>
        )}

        {/* Modal Content (Passed as children) */}
        <Box id="modal-description">{children}</Box>
      </Box>
    </Modal>
  );
};

export default ReusableModal;
