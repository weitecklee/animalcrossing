import { Badge, BadgeProps } from "@mui/material";

export default function CRBadge({...props}: BadgeProps) {
  return (
    <Badge
      {...props}
      badgeContent="CR"
      color="secondary"
      overlap="circular"
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      sx={{
        '& .MuiBadge-badge': {
          border: "1px solid black",
        }
      }}
    />
  )
}