import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { HistoryProperties, VillagerProperties } from './interfaces';

export default function HistoryCard({history, villagerData}: {history: HistoryProperties, villagerData: VillagerProperties | undefined}) {
  return (
    <Paper elevation={2}>
      <Box padding={1}>
        <Stack>
          <Avatar
            variant="square"
            src={`http://acnhapi.com/v1/images/villagers/${villagerData?.id}`}
          />
          <Typography>
            {history.name}
          </Typography>
          <Typography>
            {history.startDate.toLocaleDateString("en-ZA")}
          </Typography>
          <Typography>
            {!history.currentResident ? history.endDate.toLocaleDateString("en-ZA") : 'Present'}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}