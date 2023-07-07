import { Box, CircularProgress, Collapse, Dialog, Grid, Link, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { HistoryProperties, VillagerProperties2 } from '../types';

export default function VillagerDialog({ history, villagerData, showVillagerDialog, setShowVillagerDialog } : {
  history: HistoryProperties,
  villagerData: VillagerProperties2,
  showVillagerDialog: boolean,
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>,
}) {

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [imagesReady, setImagesReady] = useState(0);
  const [dialogReady, setDialogReady] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const previousVillager = useRef('');

  useEffect(() => {
    if (imagesReady === 3) {
      setDialogReady(true);
    }
  }, [imagesReady]);

  useEffect(() => {
    if (showVillagerDialog) {
      setTimeout(() => {
        setShowLoading(true);
      }, 1000);
      setTimeout(() => {
        setDialogReady(true);
      }, 3000);
    }
  }, [showVillagerDialog]);

  useEffect(() => {
    if (!villagerData) {
      return;
    }
    if (previousVillager.current === villagerData.name && showVillagerDialog) {
      setDialogReady(true);
    }
    previousVillager.current = villagerData.name;
  }, [showVillagerDialog, villagerData]);

  if (!history || !villagerData) {
    return;
  }

  return (<>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        display: showVillagerDialog && showLoading ? (dialogReady ? "none" : "" ) : "none",
        zIndex: 9999,
      }}
    >
      <CircularProgress size={64} />
    </Box>
    <Dialog
      keepMounted
      open={showVillagerDialog}
      onClose={() => {
        setImagesReady(0);
        setDialogReady(false);
        setShowLoading(false);
        setShowVillagerDialog(false);
      }}
      maxWidth={false}
    >
      <Collapse in={dialogReady} appear>
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
              {history.currentResident ? "" : <Typography>
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
  </>
  )
}