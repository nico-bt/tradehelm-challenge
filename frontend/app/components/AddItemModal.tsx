"use client"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

import { useState, useContext } from "react"
import { UserContext, UserType } from "../context/UserContext"
import { ItemsContext } from "../context/ItemsContext"
import { Alert } from "@mui/material"

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

export default function AddItemModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { user } = useContext(UserContext)
  const { addItem } = useContext(ItemsContext)

  const [newItem, setNewItem] = useState("")
  const [error, setError] = useState(null)

  const handleClose = () => {
    setError(null)
    setNewItem("")
    setOpen(false)
  }

  const handleAddItem = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!newItem) {
      return
    }
    const error = await addItem(newItem)
    if (error) {
      setError(error)
    } else {
      setNewItem("")
      setOpen(false)
      setError(null)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {error && <Alert severity="error">Sorry. Something went wrong. Try again</Alert>}

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Item"
              variant="outlined"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              autoFocus
            />
            <Stack spacing={2} direction="row" sx={{ justifyContent: "flex-end", marginTop: 2 }}>
              <Button variant="text" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" onClick={handleAddItem} type="submit">
                Add
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
