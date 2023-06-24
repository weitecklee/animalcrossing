import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

export default function VillagerDialog({ingredients, showIngredients, setShowIngredients}) {
  const handleClose = () => setShowIngredients(false);
  return (
    <Dialog
      open={showIngredients}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle>Ingredients</DialogTitle>
      <Divider light sx={{ borderBottomWidth: "4px" }} />
      <DialogContent>
        <DialogContentText>
          {ingredients.join(', ')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  )
}