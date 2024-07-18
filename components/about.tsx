import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Box, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import NHLogo from "../public/NH_Logo.png";
import AvatarPNG from "../public/avatar02.png";

export default function About() {
  return (
    <Stack maxWidth="80rem" spacing={2}>
      <Image
        src={NHLogo}
        alt="Animal Crossing: New Horizons logo"
        style={{
          width: "90vw",
          maxWidth: 500,
          height: "auto",
        }}
      />
      <Typography>
        <Box component="span" sx={{ fontStyle: "italic" }}>
          Animal Crossing: New Horizons
        </Box>
        &nbsp;is a simulation game made by Nintendo. In it, the player develops
        and customizes their own island, building facilities and decorating the
        landscape as they choose, as well as inviting anthropomorphic animals to
        join as residents (a.k.a. villagers). The island can have up to 10 of
        these villagers at a time living on it.
      </Typography>
      <Image
        src={AvatarPNG}
        alt="My Villager"
        priority
        style={{
          width: "90vw",
          maxWidth: 200,
          height: "auto",
        }}
      />
      <Typography>
        I have been playing&nbsp;
        <Box component="span" sx={{ fontStyle: "italic" }}>
          Animal Crossing: New Horizons
        </Box>
        &nbsp;since its release on March 20, 2020. These days, I&apos;m mostly
        playing out of habit and my own weird interest in recordkeeping and
        statistics. I keep my own records of my gameplay, noting when villagers
        come and go and when they give me their photos. All the other villager
        information (species, personality, etc.) is provided by&nbsp;
        <Link href="https://nookipedia.com/" target="_blank" rel="noopener">
          Nookipedia
          <OpenInNewRoundedIcon fontSize="inherit" />
        </Link>
        .
      </Typography>
    </Stack>
  );
}
