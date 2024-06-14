import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Box, Collapse, Grid, Link, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { dateFormatter, dayOrDays } from '../lib/functions';
import { DataContext, ScreenContext } from '../pages';
import CRIcon from './crIcon';
import CustomDialog from './customDialog';
import CustomImage from './customImage';
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

  const history = histories.get(dialogVillager)!;
  const villagerData = villagersData.get(dialogVillager)!;
  const [showCollapse, setShowCollapse] = useState(true);
  const [baseDim, setBaseDim] = useState(128);

  const handleClose = () => {
    setShowCollapse(false);
  };

  const handleClose2 = () => {
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
      <Collapse
        in={showCollapse}
        onExited={() => {
          setShowCollapse(true);
        }}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          padding={4}
          spacing={4}
        >
          <Grid item>
            <Stack direction="row" spacing={2}>
              <CustomImage
                src={villagerData.image_url}
                alt={`${history.name} image`}
                title={history.name}
                width={2 * baseDim}
                height={3 * baseDim}
                blurColor={villagerData.title_color}
                key={villagerData.image_url}
              />
              <Stack alignItems="center">
                <CustomImage
                  src={villagerData.nh_details.icon_url}
                  alt={`${history.name} icon`}
                  title={history.name}
                  width={baseDim}
                  height={baseDim}
                  blurColor={villagerData.title_color}
                  key={villagerData.nh_details.icon_url}
                />
                <CustomImage
                  src={villagerData.nh_details.photo_url}
                  alt={`${history.name} photo`}
                  title={history.name}
                  width={2 * baseDim}
                  height={2 * baseDim}
                  blurColor={villagerData.title_color}
                  key={villagerData.nh_details.photo_url}
                />
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
              Catchphrase: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.catchphrase}&quot;&ensp;「{villagerData.ja_phrase}」</Box>
              <br /><br />
              Moved in on {dateFormatter(history.startDateDate)}
            </Typography>
              {history.photo ? <Typography>
                Gave photo on {dateFormatter(history.photoDateDate)}
                <br />
                Time to give: {history.daysToPhoto} days
                </Typography> : ""}
              {history.currentResident ? "" : <Typography>
                Moved out on {dateFormatter(history.endDateDate)}
                </Typography>}
            <Typography>
              Length of stay:&nbsp;
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