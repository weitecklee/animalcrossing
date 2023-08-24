import { SvgIconComponent } from "@mui/icons-material";
import { Typography } from "@mui/material";

export default function IconWithText({ Icon, text, screenBoolean } : {
  Icon: SvgIconComponent,
  text: string,
  screenBoolean: boolean,
}) {
  return <Typography
    display="flex"
    alignItems="center"
    variant={screenBoolean ? 'caption' : 'body1'}
  >
    <Icon fontSize="inherit" />
    &ensp;{text}
  </Typography>
}