import React, { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function VillagerDialog({history, villagerData, showDialog, setShowDialog} : {history: HistoryProperties, villagerData: VillagerProperties2, showDialog: boolean, setShowDialog: Dispatch<SetStateAction<boolean>>}) {
  return (
    <Dialog
      open={showDialog}
      keepMounted
      onClose={() => setShowDialog(false)}
    >
      <DialogTitle>{villagerData.name}</DialogTitle>
      <Divider light sx={{ borderBottomWidth: "4px" }} />
      <DialogContent>
        <DialogContentText>
          {villagerData.ja_name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setShowDialog(false)} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  )
}