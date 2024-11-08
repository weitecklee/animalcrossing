import { Grid } from '@mui/material';
import { NAMES } from '../lib/constants';
import { memo } from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import CRBadge from './crBadge';
import { Box } from '@mui/material';
import VillagerTooltip from './villagerTooltip';
import { DataContext, ScreenContext } from '../pages';

function IconGridAll() {
  const { mediumScreen } = useContext(ScreenContext);
  const { histories, setDialogVillager, setShowVillagerDialog, villagersData } =
    useContext(DataContext);

  return (
    <Grid container spacing={0.5} paddingY={0.5}>
      {NAMES.map((villager) => {
        const villagerData = villagersData.get(villager)!;
        const isResident = !!histories.get(villager);
        return (
          <Grid key={villager} item>
            <VillagerTooltip villager={villager}>
              <Box>
                <CRBadge invisible={!histories.get(villager)?.currentResident}>
                  <Image
                    src={villagerData.nh_details.icon_url}
                    alt={villager}
                    title={villager}
                    height={mediumScreen ? 48 : 64}
                    width={mediumScreen ? 48 : 64}
                    onClick={() => {
                      setDialogVillager(villager);
                      setShowVillagerDialog(true);
                    }}
                    style={{
                      cursor: 'pointer',
                      opacity: isResident ? 1 : 0.4,
                    }}
                  />
                </CRBadge>
              </Box>
            </VillagerTooltip>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default memo(IconGridAll);
