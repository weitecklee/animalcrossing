import { ArrowBackRounded, ArrowForwardRounded } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Chip, ChipProps, ClickAwayListener, Collapse, DialogContent, Divider, Fab, List, ListItem, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { dayOrDays } from '../lib/functions';
import { DataContext, ScreenContext } from '../pages';
import { TraitProperties } from '../types';
import CRIcon from './crIcon';
import CustomDialog from './customDialog';
import IconGrid from './iconGrid';
import VillagerIcon from './villagerIcon';

export default function Stats() {

  const {
    currentResidents,
    durationData,
    genderData,
    histories,
    islandmatesData,
    noPhotoData,
    personalityData,
    photoData,
    photoStats,
    photoStats2,
    speciesData,
  } = useContext(DataContext);
  const { smallScreen } = useContext(ScreenContext);
  const theme = useTheme();

  const [dialogTraitData, setDialogTraitData] = useState<TraitProperties[]>([]);
  const [showTraitDialog, setShowTraitDialog] = useState(false);
  const [showDurationDialog, setShowDurationDialog] = useState(false);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [showIslandmatesDialog, setShowIslandmatesDialog] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [photoDialogTab, setPhotoDialogTab] = useState(true);
  const [showPhotoCollapse, setShowPhotoCollapse] = useState(false);
  const [traitDialogTitle, setTraitDialogTitle] = useState('');

  const TitleChip = ({title}: {title: string}) => (
    <Box
      display="flex"
      justifyContent="center"
      mb={1}
      py={1}
      px={2}
      bgcolor={theme.palette.secondary.main}
      borderRadius={Number.MAX_SAFE_INTEGER}
    >
      <Typography fontFamily='Coustard' fontSize='1.2rem'>{title}</Typography>
    </Box>)

  const PhotoDialogContent = (
    <Stack sx={{
      alignItems: "center"
    }}>
      <Divider>
        <Chip label="Time to give (stay after giving)" color="secondary" />
      </Divider>
      <List>
        {photoData.map((photo) => (
          photo.villagers.map((villager) => (
            <ListItem key={villager} disablePadding>
              <Box display="flex" alignItems="center">
                <VillagerIcon
                  villager={villager}
                />
                <Typography>
                  &nbsp;&nbsp;{photo.trait} days ({dayOrDays(histories.get(villager)!.duration - photo.duration)})
                </Typography>
              </Box>
            </ListItem>
        ))))}
      </List>
    </Stack>
  );

  const PhotoDialogContent2 = (
    <Stack sx={{
      alignItems: "center"
    }}>
      <Divider>
        <Chip label="Stay without giving" color="secondary" />
      </Divider>
      <List>
        {noPhotoData.map((noPhoto) => (
          noPhoto.villagers.map((villager) => (
            <ListItem key={villager} disablePadding>
              <Box display="flex" alignItems="center">
                <VillagerIcon
                  villager={villager}
                />
                <Typography>
                  &nbsp;&nbsp;{dayOrDays(noPhoto.duration)}
                </Typography>
              </Box>
            </ListItem>
        ))))}
      </List>
    </Stack>
  );

  const BreakdownLink = ({traitData, onClick, trait} : {
    traitData?: TraitProperties[],
    onClick?: () => void,
    trait?: string,
  }) => (
    <Button
      size="small"
      variant="contained"
      disableElevation
      color="secondary"
      sx={{
        fontFamily: "Coustard",
      }}
      onClick={() => {
        if (traitData && trait) {
          setTraitDialogTitle(trait);
          setDialogTraitData(traitData);
          setShowTraitDialog(true);
        } else {
          onClick!();
        }
      }}
    >
      Full breakdown
    </Button>
  );

  const StatsDivider = (props: ChipProps) => (
    <Divider sx={{pt: 2, pb: 1}}>
      <Chip {...props} color="secondary" />
    </Divider>
  )

  return <>
    <Typography>
      Number of Villagers: {histories.size}
    </Typography>
    <Stack direction="row" alignItems="center">
      <CRIcon />
      <Typography component='span'>
        &ensp;Current Residents:
      </Typography>
    </Stack>
    <IconGrid villagers={currentResidents} />
    <StatsDivider label='Length of Stay' />
    <Typography>
      Average: {(Array.from(histories.values()).reduce((a, b) => a + b.duration, 0) / histories.size).toFixed(2)} days
      <br />
      Longest: {(durationData[0].duration)} days
      <br />
    </Typography>
    <IconGrid
      traitData={durationData[0]}
    />
    <Typography>
      Shortest: {dayOrDays(durationData[durationData.length - 1].duration)}
    </Typography>
    <IconGrid
      traitData={durationData[durationData.length - 1]}
    />
    <BreakdownLink onClick={() => {setShowDurationDialog(true);}} />
    <StatsDivider label='Species' />
    <Typography>
      Most common: {speciesData[0].trait}
    </Typography>
    <IconGrid
      traitData={speciesData[0]}
    />
    <Typography>
      <BreakdownLink traitData={speciesData} trait='Species'/>
    </Typography>
    <StatsDivider label='Personality' />
    <Typography>
      Most common: {personalityData[0].trait}
    </Typography>
    <IconGrid
      traitData={personalityData[0]}
    />
    <Typography>
      <BreakdownLink traitData={personalityData} trait='Personality' />
    </Typography>
    <StatsDivider label='Gender' />
    <Typography>
      {genderData[0].trait}: {genderData[0].count}
      <br />
      {genderData[1].trait}: {genderData[1].count}
      <br />
      <BreakdownLink traitData={genderData} trait='Gender' />
    </Typography>
    <StatsDivider
      label="Photos"
      deleteIcon={
        <Tooltip
          title={
            <ClickAwayListener onClickAway={() => {setShowTooltip(false);}}>
              <Typography>
                You can interact with villagers to raise your friendship level with them, usually by talking to them, giving them gifts, or completing tasks for them. Once this friendship level is high enough, villagers may randomly give you their photo after being gifted a high quality item. I usually try to wait till I have received a villager&#39;s photo before I let them leave the island.
              </Typography>
            </ClickAwayListener>
          }
          open={showTooltip}
        >
          <InfoOutlinedIcon />
        </Tooltip>
      }
      onDelete={() => {setShowTooltip((a) => !a)}}
    />
    <Typography>
      Given: {photoStats.count} ({(photoStats.count / histories.size * 100).toFixed(2)}%)
      <br />
      Average time to give: {photoStats.average.toFixed(2)} days
      <br />
      Quickest: {photoData[0].trait} days
    </Typography>
    <IconGrid
      traitData={photoData[0]}
    />
    <Typography>
      Slowest: {photoData[photoData.length - 1].trait} days
    </Typography>
    <IconGrid
      traitData={photoData[photoData.length - 1]}
    />
    <Typography>
      Shortest stay after giving photo: {dayOrDays(photoStats2.shortestAfterGiving.duration - 1)}
    </Typography>
    <IconGrid
      traitData={photoStats2.shortestAfterGiving}
    />
    <Typography>
      Longest stay after giving photo: {dayOrDays(photoStats2.longestAfterGiving.duration - 1)}
    </Typography>
    <IconGrid
      traitData={photoStats2.longestAfterGiving}
    />
    <Typography>
      Longest stay without giving photo: {photoStats2.longestWithoutGiving.duration} days
    </Typography>
    <IconGrid
      traitData={photoStats2.longestWithoutGiving}
    />
    <BreakdownLink onClick={() => {setShowPhotoDialog(true); setShowPhotoCollapse(true);}} />
    <StatsDivider label='Islandmates' />
    <Typography>
      Most islandmates: {islandmatesData[0].trait}
    </Typography>
    <IconGrid
      traitData={islandmatesData[0]}
    />
    <Typography>
      Fewest islandmates: {islandmatesData[islandmatesData.length - 1].trait}
    </Typography>
    <IconGrid
      traitData={islandmatesData[islandmatesData.length - 1]}
      />
    <BreakdownLink onClick={() => {setShowIslandmatesDialog(true);}} />
    <CustomDialog
      open={showDurationDialog}
      onClose={() => setShowDurationDialog(false)}
      maxWidth={false}
      zIndex={1200}
    >
      <DialogContent>
        <TitleChip title={'Length of Stay'}/>
        <List>
          {durationData.map((duration) => (
            duration.villagers.map((villager) => (
              <ListItem key={villager} disablePadding sx={{display: 'flex', justifyContent: 'center'}}>
                <Box display="flex" alignItems="center">
                  <VillagerIcon
                    villager={villager}
                  />
                  <Typography>
                    &nbsp;&nbsp;{dayOrDays(duration.trait)}
                  </Typography>
                </Box>
              </ListItem>
          ))))}
        </List>
      </DialogContent>
    </CustomDialog>
    <CustomDialog
      open={showTraitDialog}
      onClose={() => setShowTraitDialog(false)}
      maxWidth={false}
      zIndex={1200}
    >
      <DialogContent>
        <TitleChip title={traitDialogTitle}/>
        {dialogTraitData.map((traitData) => (<Box key={traitData.trait}>
          <Divider>
            <Chip label={`${traitData.trait}: ${traitData.count}`} color="secondary" />
          </Divider>
          <IconGrid
            traitData={traitData}
          />
        </Box>))}
      </DialogContent>
    </CustomDialog>
    <CustomDialog
      open={!smallScreen && showPhotoDialog}
      onClose={() => setShowPhotoDialog(false)}
      maxWidth={false}
      zIndex={1200}
    >
      <DialogContent>
        <TitleChip title='Photos' />
        <Stack direction="row" spacing={2}>
          {PhotoDialogContent}
          <Divider orientation='vertical' flexItem/>
          {PhotoDialogContent2}
        </Stack>
      </DialogContent>
    </CustomDialog>
    <CustomDialog
      open={smallScreen && showPhotoDialog}
      onClose={() => setShowPhotoDialog(false)}
      maxWidth={false}
      zIndex={1200}
    >
      <Collapse
        in={showPhotoCollapse}
        orientation="horizontal"
        onExited={() => {
          setPhotoDialogTab((a) => !a);
          setShowPhotoCollapse(true);
        }}
      >
        <DialogContent>
          <TitleChip title='Photos' />
          {photoDialogTab ? PhotoDialogContent : PhotoDialogContent2}
        </DialogContent>
      </Collapse>
      <Fab
        size="small"
        color="secondary"
        sx={{
          display: photoDialogTab ? "none" : "flex",
          ':hover': {
            bgcolor: "white"
          },
          position: "fixed",
          top: "50%",
          left: 8,
        }}
        onClick={() => setShowPhotoCollapse(false)}
      >
        <ArrowBackRounded />
      </Fab>
      <Fab
        size="small"
        color="secondary"
        sx={{
          display: photoDialogTab ? "flex" : "none",
          ':hover': {
            bgcolor: "white"
          },
          position: "fixed",
          top: "50%",
          right: 8,
        }}
        onClick={() => setShowPhotoCollapse(false)}
      >
        <ArrowForwardRounded />
      </Fab>
    </CustomDialog>
    <CustomDialog
      open={showIslandmatesDialog}
      onClose={() => setShowIslandmatesDialog(false)}
      maxWidth={false}
      zIndex={1200}
    >
      <DialogContent>
        <TitleChip title='Islandmates' />
        <List>
          {islandmatesData.map((islandmates) => (
            islandmates.villagers.map((villager) => (
              <ListItem key={villager} disablePadding sx={{display: 'flex', justifyContent: 'center'}}>
                <Box display="flex" alignItems="center">
                  <VillagerIcon
                    villager={villager}
                  />
                  <Typography>
                    &nbsp;&nbsp;{islandmates.trait}
                  </Typography>
                </Box>
              </ListItem>
          ))))}
        </List>
      </DialogContent>
    </CustomDialog>
  </>

}