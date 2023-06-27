import React, { Dispatch, SetStateAction } from 'react';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { HistoryProperties, VillagerProperties2 } from '../types';
import { Typography } from '@mui/material';
import Image from 'next/image';

export default function CardDialog({history, villagerData, showDialog, setShowDialog} : {history: HistoryProperties, villagerData: VillagerProperties2, showDialog: boolean, setShowDialog: Dispatch<SetStateAction<boolean>>}) {

  return (
    <Dialog
      open={showDialog}
      keepMounted
      onClose={() => setShowDialog(false)}
      maxWidth='xl'
    >
      <Grid
        container
        alignItems='center'
        padding={2}
      >
        <Grid item pl={2}>
          <Stack direction="row">
            <Image
              src={villagerData.nh_details.image_url}
              alt={history.name}
              height={384}
              width={384}
              style={{
                objectFit: "contain"
              }}
            />
            <Stack alignItems="center">
              <Image
                src={villagerData.nh_details.icon_url}
                alt={history.name}
                width={128}
                height={128}
              />
              <Image
                src={villagerData.nh_details.photo_url}
                alt={history.name}
                width={256}
                height={256}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item px={4}>
          <Typography variant="h6">
            {history.name}&emsp;{villagerData.ja_name}
          </Typography>
          <Typography>
            {villagerData.gender} {villagerData.species}
          </Typography>
          <Typography>
            Birthday: {villagerData.birthday_month} {villagerData.birthday_day}
          </Typography>
          <Typography>
            Quote: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.quote}&quot;</Box>
          </Typography>
          <Typography>
            Catchphrase: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.catchphrase}&quot;</Box>
          </Typography>
          <br />
          <Typography>
            Moved in on {history.startDateString}
          </Typography>
          {!history.currentResident && <Typography>
            Moved out on {history.endDateString}
            </Typography>}
          <Typography>
            Duration of residence:&nbsp;
            {history.duration} days{history.currentResident && " and counting"}
          </Typography>
          <br />
          <Typography variant="body2">
            <Link
              href={villagerData.url}
              target="_blank"
              rel="noreferrer"
              underline="hover"
              >
              Nookipedia page
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  )
}