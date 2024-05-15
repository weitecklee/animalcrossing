import { Badge, BadgeProps } from "@mui/material";
import { useContext } from 'react';
import { ScreenContext } from '../pages';

export default function CRBadge({...props}: BadgeProps) {

  const { mediumScreen } = useContext(ScreenContext);

  return (
    <Badge
      {...props}
      variant={mediumScreen ? "dot" : "standard"}
      badgeContent="CR"
      color="secondary"
      overlap="circular"
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      sx={{
        '& .MuiBadge-badge': {
          border: "1px solid black",
        }
      }}
      title='Current Resident'
    />
  )
}