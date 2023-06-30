import React, { Dispatch, SetStateAction } from 'react';
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

export default function VillagerDialog({history, villagerData, showDialog, setShowDialog} : {history: HistoryProperties, villagerData: VillagerProperties2, showDialog: boolean, setShowDialog: Dispatch<SetStateAction<boolean>>}) {

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))
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
      open={showDialog}
      keepMounted
      onClose={() => setShowDialog(false)}
      maxWidth={false}
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
            <Box
              position="relative"
              height={smallScreen ? 192 : 384}
              // width={imageWidth}
            >
              <Image
                src={villagerData.nh_details.image_url}
                alt={`${history.name} image`}
                title={history.name}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: 'auto',
                  height: '100%'
                }}
                // onLoadingComplete={(img) => {
                //   setAspectRatio(img.naturalWidth / img.naturalHeight);
                // }}
              />
            </Box>
            <Stack alignItems="center">
              <Image
                src={villagerData.nh_details.icon_url}
                alt={`${history.name} icon`}
                title={history.name}
                width={smallScreen ? 64 : 128}
                height={smallScreen ? 64 : 128}
              />
              <Image
                src={villagerData.nh_details.photo_url}
                alt={`${history.name} photo`}
                title={history.name}
                width={smallScreen ? 128 : 256}
                height={smallScreen ? 128 : 256}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            {history.name}&emsp;{villagerData.ja_name}
          </Typography>
          <Typography>
            {villagerData.gender} {villagerData.species}
            <br />
            Birthday: {villagerData.birthday_month} {villagerData.birthday_day}
            <br />
            Quote: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.quote}&quot;</Box>
            <br />
            Catchphrase: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.catchphrase}&quot;</Box>
            <br /><br />
            Moved in on {history.startDateString}
            {history.photo ? <Typography>Photo received on {history.photoDateString}</Typography> : ""}
            {history.currentResident ? <br/> : <Typography>
              Moved out on {history.endDateString}
              </Typography>}
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