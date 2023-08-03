import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';
import { Box, Chip, ClickAwayListener, DialogContent, Divider, Grid, Link, List, ListItem, Stack, Tooltip, Typography } from '@mui/material';
import { MouseEvent, useContext, useState } from 'react';
import { dayOrDays } from '../lib/functions';
import { DataContext } from '../pages';
import { TraitProperties } from '../types';
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

  const [dialogTraitData, setDialogTraitData] = useState<TraitProperties[]>([]);
  const [showTraitDialog, setShowTraitDialog] = useState(false);
  const [showDurationDialog, setShowDurationDialog] = useState(false);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [showIslandmatesDialog, setShowIslandmatesDialog] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const BreakdownLink = ({traitData, onClick} : {
    traitData?: TraitProperties[],
    onClick?: () => void,
  }) => (
    <Link
      href="#"
      underline="none"
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (traitData) {
          setDialogTraitData(traitData);
          setShowTraitDialog(true);
        } else {
          onClick!();
        }
      }}
    >
      Full breakdown
        <ReadMoreRoundedIcon fontSize="inherit" />
    </Link>
  );

  return <>
    <Typography>
      Number of Villagers: {histories.size}
      <br />
      Current residents:
    </Typography>
    <IconGrid villagers={currentResidents} />
    <Divider>
      <Chip label="Duration of Residence" color="secondary" />
    </Divider>
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
    <Divider>
      <Chip label="Species" color="secondary" />
    </Divider>
    <Typography>
      Most common: {speciesData[0].trait}
    </Typography>
    <IconGrid
      traitData={speciesData[0]}
    />
    <Typography>
      <BreakdownLink traitData={speciesData}/>
    </Typography>
    <Divider>
      <Chip label="Personality" color="secondary" />
    </Divider>
    <Typography>
      Most common: {personalityData[0].trait}
    </Typography>
    <IconGrid
      traitData={personalityData[0]}
    />
    <Typography>
      <BreakdownLink traitData={personalityData}/>
    </Typography>
    <Divider>
      <Chip label="Gender" color="secondary" />
    </Divider>
    <Typography>
      {genderData[0].trait}: {genderData[0].count}
      <br />
      {genderData[1].trait}: {genderData[1].count}
      <br />
      <BreakdownLink traitData={genderData}/>
    </Typography>
    <Divider>
      <Chip
        label="Photos"
        color="secondary"
        deleteIcon={
          <Tooltip
            title={
              <ClickAwayListener onClickAway={() => {setShowTooltip(false);}}>
                <Typography>
                  You can interact with villagers to raise your friendship level with them, usually by talking to them, giving them gifts, or completing tasks for them. Once this friendship level is high enough, villagers may randomly give you their photo. The full breakdown shows the wide range of time it can take to receive photos, even though I try to interact with each of the villagers at least once every day. (And then there are those who never gave me their photos even after over half a year...)
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
    </Divider>
    <Typography>
      Received: {photoStats.count} ({(photoStats.count / histories.size * 100).toFixed(2)}%)
      <br />
      Average time to receive: {photoStats.average.toFixed(2)} days
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
      Shortest stay after receving photo: {dayOrDays(photoStats2.shortestAfterReceiving.duration - 1)}
    </Typography>
    <IconGrid
      traitData={photoStats2.shortestAfterReceiving}
    />
    <Typography>
      Longest stay after receiving photo: {dayOrDays(photoStats2.longestAfterReceiving.duration - 1)}
    </Typography>
    <IconGrid
      traitData={photoStats2.longestAfterReceiving}
    />
    <Typography>
      Longest stay without receiving photo: {photoStats2.longestWithoutReceiving.duration} days
    </Typography>
    <IconGrid
      traitData={photoStats2.longestWithoutReceiving}
    />
    <BreakdownLink onClick={() => {setShowPhotoDialog(true);}} />
    <Divider>
      <Chip label="Islandmates" color="secondary" />
    </Divider>
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
      keepMounted
      zIndex={1200}
    >
      <DialogContent>
        <List>
          {durationData.map((duration) => (
            duration.villagers.map((villager) => (
              <ListItem key={villager} disablePadding>
                <Box display="flex" alignItems="center">
                  <VillagerIcon
                    villager={villager}
                  />
                  <Typography>
                    &nbsp;&nbsp;{duration.trait} days
                  </Typography>
                </Box>
              </ListItem>
          ))))}
        </List>
      </DialogContent>
    </CustomDialog>
    <CustomDialog
      open={showTraitDialog}
      keepMounted
      onClose={() => setShowTraitDialog(false)}
      maxWidth={false}
      zIndex={1200}
    >
      <DialogContent>
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
      open={showPhotoDialog}
      onClose={() => setShowPhotoDialog(false)}
      maxWidth={false}
      keepMounted
      zIndex={1200}
    >
      <DialogContent>
        <Stack direction="row" spacing={2}>
          <Stack sx={{
            alignItems: "center"
          }}>
            <Divider>
              <Chip label="Time to receive (stay after receiving)" color="secondary" />
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
          <Divider orientation='vertical' flexItem/>
          <Stack sx={{
            alignItems: "center"
          }}>
            <Divider>
              <Chip label="Stay without receiving" color="secondary" />
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
        </Stack>
      </DialogContent>
    </CustomDialog>
    <CustomDialog
      open={showIslandmatesDialog}
      onClose={() => setShowIslandmatesDialog(false)}
      maxWidth={false}
      keepMounted
      zIndex={1200}
    >
      <DialogContent>
        <List>
          {islandmatesData.map((islandmates) => (
            islandmates.villagers.map((villager) => (
              <ListItem key={villager} disablePadding>
                <Box display="flex" alignItems="center">
                  <VillagerIcon
                    villager={villager}
                  />
                  <Typography>
                    &nbsp;&nbsp;{islandmates.trait} islandmates
                  </Typography>
                </Box>
              </ListItem>
          ))))}
        </List>
      </DialogContent>
    </CustomDialog>
  </>

}