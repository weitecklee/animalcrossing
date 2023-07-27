import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { useContext } from 'react';
import { DataContext, ScreenContext } from '../pages';

export default function VillagerIcon({ villager, customOnClick } : {
  villager: string,
  customOnClick?: () => void,
}) {

  const theme = useTheme();

  const {
    setDialogVillager,
    setShowVillagerDialog,
    villagersData,
  } = useContext(DataContext);
  const mediumScreen = useContext(ScreenContext);

  return (
    <Image
      src={villagersData.get(villager)?.nh_details.icon_url!}
      alt={villager}
      height={mediumScreen ? 40 : 64}
      width={mediumScreen ? 40 : 64}
      title={villager}
      onClick={() => {
        if (customOnClick) {
          customOnClick();
          setTimeout(() => {
            setDialogVillager(villager);
          }, theme.transitions.duration.standard);
        } else {
          setDialogVillager(villager);
          setShowVillagerDialog(true);
        }
      }}
      style={{
        cursor: 'pointer',
      }}
    />
  );

}