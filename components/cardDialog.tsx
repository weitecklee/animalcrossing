import React, { Dispatch, SetStateAction } from 'react';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import { HistoryProperties, VillagerProperties2 } from '../types';
import { Typography } from '@mui/material';
import Image from 'next/image';

export default function CardDialog({history, villagerData, showDialog, setShowDialog} : {history: HistoryProperties, villagerData: VillagerProperties2, showDialog: boolean, setShowDialog: Dispatch<SetStateAction<boolean>>}) {

  return (
    <Dialog
      open={showDialog}
      keepMounted
      onClose={() => setShowDialog(false)}
      maxWidth='lg'
      fullWidth
    >
      <Grid
        container
        alignItems='center'
      >
        <Grid item xs={6}>
          <Image
            src={villagerData.nh_details.photo_url}
            alt={history.name}
            width={256}
            height={256}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            {history.name} {villagerData.ja_name}
          </Typography>
          <Typography>
            Moved in on {history.startDate.toLocaleDateString("en-ZA")}
          </Typography>
          {!history.currentResident && <Typography>
            Moved out on {history.endDate.toLocaleDateString("en-ZA")}
            </Typography>}
            <Typography>
              Duration of residence:&nbsp;
              {Math.round((history.endDate.getTime() - history.startDate.getTime()) / (1000 * 3600 * 24)) + 1} days
            </Typography>
        </Grid>
      </Grid>
    </Dialog>
  )
}