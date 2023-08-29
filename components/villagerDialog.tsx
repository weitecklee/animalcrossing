import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Box, Collapse, Grid, Link, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { Suspense, useContext, useEffect, useState } from 'react';
import { dateFormatter, dayOrDays } from '../lib/functions';
import { DataContext, ScreenContext } from '../pages';
import CRIcon from './crIcon';
import CustomDialog from './customDialog';
import IconGrid from './iconGrid';

export default function VillagerDialog({ dialogVillager, showVillagerDialog } : {
  dialogVillager: string,
  showVillagerDialog: boolean,
}) {

  const {
    histories,
    setShowVillagerDialog,
    villagersData,
  } = useContext(DataContext);
  const { mediumScreen } = useContext(ScreenContext);
  const theme = useTheme();

  const history = histories.get(dialogVillager)!;
  const villagerData = villagersData.get(dialogVillager)!;
  const [showCollapse, setShowCollapse] = useState(true);
  const [baseDim, setBaseDim] = useState(128);

  const handleClose = () => {
    setShowCollapse(false);
    setTimeout(() => {
      setShowCollapse(true);
    }, theme.transitions.duration.standard);
  };

  const handleClose2 = () => {
    handleClose();
    setShowVillagerDialog(false);
  };

  useEffect(() => {
    if (mediumScreen) {
      setBaseDim(64);
    } else {
      setBaseDim(128);
    }
  }, [mediumScreen]);

  if (!history || !villagerData) {
    return;
  }

  return (<>
    <CustomDialog
      open={showVillagerDialog}
      onClose={handleClose2}
      maxWidth={false}
      zIndex={1300}
    >
      <Collapse in={showCollapse} appear unmountOnExit>
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
                height={3 * baseDim}
              >
                <Suspense fallback={<Skeleton variant="rectangular" width={2 * baseDim} height={3 * baseDim} />}>
                  <Image
                    src={villagerData.image_url}
                    alt={`${history.name} image`}
                    title={history.name}
                    width={4 * baseDim}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: 'auto',
                      height: '100%',
                    }}
                  />
                </Suspense>
              </Box>
              <Stack alignItems="center">
                <Suspense fallback={<Skeleton variant="rectangular" width={baseDim} height={baseDim} />}>
                  <Image
                    src={villagerData.nh_details.icon_url}
                    alt={`${history.name} icon`}
                    title={history.name}
                    width={baseDim}
                    height={baseDim}
                  />
                </Suspense>
                <Suspense fallback={<Skeleton variant="rectangular" width={2 * baseDim} height={2 * baseDim} />}>
                  <Image
                    src={villagerData.nh_details.photo_url}
                    alt={`${history.name} photo`}
                    title={history.name}
                    width={2 * baseDim}
                    height={2 * baseDim}
                  />
                </Suspense>
              </Stack>
            </Stack>
          </Grid>
          <Grid item maxWidth={mediumScreen? 40 * 8 : 64 * 9 }>
            <Stack direction="row" alignItems="center">
              <Typography variant="h6" fontFamily="Coustard">
                {history.name}&ensp;{villagerData.ja_name}&ensp;
              </Typography>
              {history.currentResident ? <CRIcon /> : ''}
            </Stack>
            <Typography>
              {villagerData.personality} {villagerData.gender} {villagerData.species}
              <br />
              Birthday: {villagerData.birthday_month} {villagerData.birthday_day}
              <br />
              Quote: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.quote}&quot;</Box>
              <br />
              Catchphrase: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.catchphrase}&quot;</Box>
              <br /><br />
              Moved in on {dateFormatter(history.startDateDate)}
            </Typography>
              {history.photo ? <Typography>
                Photo received on {dateFormatter(history.photoDateDate)}
                <br />
                Time to receive: {history.daysToPhoto} days
                </Typography> : ""}
              {history.currentResident ? "" : <Typography>
                Moved out on {dateFormatter(history.endDateDate)}
                </Typography>}
            <Typography>
              Duration of residence:&nbsp;
              {dayOrDays(history.duration)}{history.currentResident && " and counting"}
            </Typography>
            <br />
            <Typography>
              {history.islandmates.length} islandmates:
            </Typography>
            <IconGrid
              villagers={history.islandmates}
              customOnClick={handleClose}
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