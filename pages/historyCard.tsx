import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { HistoryProperties, VillagerProperties } from '../types';

export default function HistoryCard({history, villagerData}: {history: HistoryProperties, villagerData: VillagerProperties | undefined}) {
  return (
    <Paper elevation={2}>
      <Box padding={1} bgcolor={history?.currentResident ? 'success.light' : ''}>
        <Stack>
          <Avatar
            variant="square"
            src={`http://acnhapi.com/v1/images/villagers/${villagerData?.id}`}
            sx={{ width: 150, height: 150 }}
          />
          <Typography>
            {history?.name}
          </Typography>
          <Typography>
            {villagerData?.name['name-JPja']}
          </Typography>
          <Typography>
            {history?.startDate.toLocaleDateString("en-ZA")}
          </Typography>
          <Typography>
            {!history?.currentResident ? history?.endDate.toLocaleDateString("en-ZA") : 'Present'}
          </Typography>
          <Typography>
            {Math.round((history?.endDate.getTime() - history?.startDate.getTime()) / (1000 * 3600 * 24)) + 1} days
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}