"use client"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

import { useState } from "react"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "grid",
  gap: 2,
}

export default function AddItemModal({ open, setOpen }) {
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField sx={{ width: "100%" }} id="outlined-basic" label="Item" variant="outlined" />
          </Box>

          <Stack spacing={2} direction="row" sx={{ justifyContent: "flex-end" }}>
            <Button variant="text" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
