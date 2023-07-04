import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { HistoryProperties, VillagerProperties2 } from '../types';
import { Typography } from '@mui/material';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Collapse from "@mui/material/Collapse";

export default function VillagerDialog({history, villagerData, showVillagerDialog, setShowVillagerDialog} : {history: HistoryProperties, villagerData: VillagerProperties2, showVillagerDialog: boolean, setShowVillagerDialog: Dispatch<SetStateAction<boolean>>}) {

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [imagesReady, setImagesReady] = useState(0);
  const [dialogReady, setDialogReady] = useState(false);

  useEffect(() => {
    if (!showVillagerDialog) {
      setImagesReady(0);
      setDialogReady(false);
    }
  }, [showVillagerDialog]);

  useEffect(() => {
    if (imagesReady === 3) {
      setDialogReady(true);
    }
  }, [imagesReady]);

  // const [aspectRatio, setAspectRatio] = useState(.5);
  // const [imageWidth, setImageWidth] = useState(100);

  // useEffect(() => {
  //   setImageWidth((smallScreen ? 192 : 384) * aspectRatio);
  // }, [aspectRatio, smallScreen]);

  if (!history || !villagerData) {
    return;
  }
  return (
    <Dialog
      keepMounted
      open={showVillagerDialog}
      onClose={() => setShowVillagerDialog(false)}
      maxWidth={false}
    >
      <Collapse in={showVillagerDialog} appear>
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          padding={4}
          spacing={4}
        >
          <Grid item>
            <Stack direction="row" spacing={2}>
              <Box
                position="relative"
                height={smallScreen ? 192 : 384}
                // width={imageWidth}
              >
                <Image
                  src={villagerData.nh_details.image_url}
                  alt={`${history.name} image`}
                  title={history.name}
                  width={256}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: 'auto',
                    height: '100%',
                  }}
                  onLoadingComplete={() => {
                    setImagesReady((a) => a + 1)
                  }}
                />
              </Box>
              <Stack alignItems="center">
                <Image
                  src={villagerData.nh_details.icon_url}
                  alt={`${history.name} icon`}
                  title={history.name}
                  width={smallScreen ? 64 : 128}
                  height={smallScreen ? 64 : 128}
                  onLoadingComplete={() => {
                    setImagesReady((a) => a + 1)
                  }}
                />
                <Image
                  src={villagerData.nh_details.photo_url}
                  alt={`${history.name} photo`}
                  title={history.name}
                  width={smallScreen ? 128 : 256}
                  height={smallScreen ? 128 : 256}
                  onLoadingComplete={() => {
                    setImagesReady((a) => a + 1)
                  }}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {history.name}&emsp;{villagerData.ja_name}
            </Typography>
            <Typography>
              {villagerData.personality} {villagerData.gender} {villagerData.species}
              <br />
              Birthday: {villagerData.birthday_month} {villagerData.birthday_day}
              <br />
              Quote: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.quote}&quot;</Box>
              <br />
              Catchphrase: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.catchphrase}&quot;</Box>
              <br /><br />
              Moved in on {history.startDateString}
            </Typography>
              {history.photo ? <Typography>
                Photo received on {history.photoDateString}
                <br />
                Time to receive: {history.daysToPhoto} days
                </Typography> : ""}
              {history.currentResident ? <br/> : <Typography>
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
      </Collapse>
    </Dialog>
  )
}