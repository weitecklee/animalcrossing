import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  TimeScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Zoom from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TimelineDataProperties, VillagerProperties2, HistoryProperties } from '../types';
import TimelineTooltip from './timelineTooltip';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import VillagerDialog from './villagerDialog';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  TimeScale,
  Zoom,
);

const options = {
  indexAxis: 'y' as const ,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 1,
      borderSkipped: false,
      borderColor: '#000',
      borderRadius: Number.MAX_VALUE,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    zoom: {
      limits: {
        x: { min: 'original', max: 'original', minRange: 86400000 * 365 },
        y: { min: 'original', max: 'original', minRange: 20 },
      },
      pan: { enabled: true, mode: 'xy', threshold: 10 },
      zoom: {
        mode: 'xy',
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      type: 'time',
      min: new Date('2020/03/26').valueOf() - 86400000,
      max: new Date().valueOf() + 86400000,
      time: {
        minUnit: 'month',
        displayFormats: {
          day: 'MMM d yyyy',
        },
      },
    },
    y: {
      display: false,
    }
  }
} as any;

export default function Timeline({ timelineData, villagersData, histories }: { timelineData: TimelineDataProperties, villagersData: Map<string,VillagerProperties2>, histories: Map<string,HistoryProperties> }) {

  // const [timelineChart, setTimelineChart] = useState({} as any);
  // const [timelineTooltip, setTimelineTooltip] = useState({} as any);
  const [timelineVillager, setTimelineVillager] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const shortScreen = useMediaQuery('(max-height:700px)')
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [showDialog, setShowDialog] = useState(false);

  options.plugins.tooltip.external = ({ tooltip }) => {
    // const a = {...chart};
    // const b = {...tooltip};
    // setTimelineChart(a);
    // setTimelineTooltip(b);
    if (tooltip && tooltip.title) {
      setTimelineVillager(tooltip.title[0]);
      setShowTooltip(true);
    }
  }

  const handleClose = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  useEffect(() => {
    setOpenSnackbar(smallScreen);
  }, [smallScreen]);

  return <Box sx={{
    position: "relative",
    margin: "auto",
    width: "90vw",
    height: shortScreen ? "80vh" : "90vh",
  }}>
    <Snackbar
      open={openSnackbar}
      onClose={handleClose}
    >
      <Alert
        severity="warning"
        onClose={handleClose}
        sx={{
          width: "100%"
        }}
      >
        This page is best viewed on a large screen.
      </Alert>
    </Snackbar>
    <Bar
      data={timelineData}
      options={options}
    />
    {showTooltip &&
      <TimelineTooltip
        villagerData={villagersData.get(timelineVillager)!}
        history={histories.get(timelineVillager)!}
        setShowDialog={setShowDialog}
      />
    }
    <VillagerDialog
      history={histories.get(timelineVillager)!}
      villagerData={villagersData.get(timelineVillager)!}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
    />
  </Box>
}