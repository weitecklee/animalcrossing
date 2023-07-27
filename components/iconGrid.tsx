import { Grid } from '@mui/material';
import { TraitProperties } from '../types';
import VillagerIcon from './villagerIcon';

export default function IconGrid({ traitData, villagers, customOnClick } : {
  traitData?: TraitProperties,
  villagers?: string[],
  customOnClick?: () => void,
}) {

  if (!!traitData) {
    return (
      <Grid container>
        {traitData.villagers.map((villager) =>
          <Grid key={villager}
            item
          >
            <VillagerIcon
              villager={villager}
              customOnClick={customOnClick}
            />
          </Grid>
        )}
      </Grid>
    )
  }
  return (
    <Grid container>
      {villagers!.map((villager) =>
        <Grid key={villager}
          item
        >
          <VillagerIcon
            villager={villager}
            customOnClick={customOnClick}
          />
        </Grid>
      )}
    </Grid>
  )

}