import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Box, CircularProgress, Collapse, Grid, Link, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { HistoryProperties, VillagerProperties2 } from '../types';
import CustomDialog from './customDialog';
import IconGrid from './iconGrid';

const timeouts: NodeJS.Timeout[] = [];

export default function VillagerDialog({ histories, villagersData, dialogVillager, setDialogVillager, showVillagerDialog, setShowVillagerDialog } : {
  histories: Map<string,HistoryProperties>,
  villagersData: Map<string,VillagerProperties2>,
  dialogVillager: string,
  setDialogVillager: Dispatch<SetStateAction<string>>,
  showVillagerDialog: boolean,
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>,
}) {

  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [imagesReady, setImagesReady] = useState(0);
  const [dialogReady, setDialogReady] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const previousVillager = useRef('');
  const history = histories.get(dialogVillager)!;
  const villagerData = villagersData.get(dialogVillager)!;

  const handleClose = () => {
    while (timeouts.length) {
      clearTimeout(timeouts.pop());
    }
    setImagesReady(0);
    setDialogReady(false);
    setShowLoading(false);
    setShowVillagerDialog(false);
  };

  useEffect(() => {
    if (imagesReady === 3) {
      setDialogReady(true);
    }
  }, [imagesReady]);

  useEffect(() => {
    if (showVillagerDialog) {
      const timeoutID1 = setTimeout(() => {
        setShowLoading(true);
      }, 1000);
      const timeoutID2 = setTimeout(() => {
        setDialogReady(true);
      }, 3000);
      timeouts.push(timeoutID1, timeoutID2);
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
        display: showVillagerDialog && showLoading ? (dialogReady ? "none" : "flex" ) : "none",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1301,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={64} color="secondary" />
    </Box>
    <CustomDialog
      keepMounted
      open={showVillagerDialog}
      onClose={handleClose}
      maxWidth={false}
      zIndex={1300}
      PaperProps={{sx: smallScreen ? {
        maxWidth: "100%",
        mx: "16px",
      } : {}}}
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
                height={mediumScreen ? 192 : 384}
              >
                <Image
                  src={villagerData.image_url}
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
                  width={mediumScreen ? 64 : 128}
                  height={mediumScreen ? 64 : 128}
                  onLoadingComplete={() => {
                    setImagesReady((a) => a + 1)
                  }}
                />
                <Image
                  src={villagerData.nh_details.photo_url}
                  alt={`${history.name} photo`}
                  title={history.name}
                  width={mediumScreen ? 128 : 256}
                  height={mediumScreen ? 128 : 256}
                  onLoadingComplete={() => {
                    setImagesReady((a) => a + 1)
                  }}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item maxWidth={mediumScreen? 40 * 8 : 64 * 9 }>
            <Typography variant="h6" fontFamily="Coustard">
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
            <Typography>
              {history.islandmates.length} islandmates:
            </Typography>
            <IconGrid
              villagers={history.islandmates}
              villagersData={villagersData}
              mediumScreen={mediumScreen}
              setDialogVillager={setDialogVillager}
              setShowVillagerDialog={setShowVillagerDialog}
            />
            <br />
            <Typography variant="body2">
              <Link
                href={villagerData.url}
                target="_blank"
                rel="noreferrer"
                underline="hover"
                >
                Nookipedia page
                <OpenInNewRoundedIcon fontSize='inherit'/>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Collapse>
    </CustomDialog>
  </>
  )
}