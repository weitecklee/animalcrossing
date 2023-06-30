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
import ViewTimelineRoundedIcon from '@mui/icons-material/ViewTimelineRounded';
import Fab from '@mui/material/Fab';
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

const options2 = JSON.parse(JSON.stringify(options));
options2.plugins.zoom.limits = {
  x: { min: 'original', max: 'original', minRange: 10 },
  y: { min: 'original', max: 'original', minRange: 20 },
};
options2.scales.x = {
  min: 0,
  max: 400,
};

export default function Timeline({ timelineData, timelineData2, villagersData, histories, timelineLabels, timelineColors }: {
  timelineData: TimelineDataProperties,
  timelineData2: TimelineDataProperties,
  villagersData: Map<string,VillagerProperties2>,
  histories: Map<string,HistoryProperties> ,
  timelineLabels: string[],
  timelineColors: string[],
}) {

  // const [timelineChart, setTimelineChart] = useState({} as any);
  // const [timelineTooltip, setTimelineTooltip] = useState({} as any);
  const [timelineVillager, setTimelineVillager] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const shortScreen = useMediaQuery('(max-height:700px)')
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [showDialog, setShowDialog] = useState(false);
  const [timelineMode, setTimelineMode] = useState(true);
  const [barData, setBarData] = useState(timelineData);

  options.plugins.tooltip.external = ({ tooltip }) => {
    // const a = {...chart};
    // const b = {...tooltip};
    // setTimelineChart(a);
    // setTimelineTooltip(b);
    if (tooltip && tooltip.title) {
      setTimelineVillager(tooltip.title[0]);
      setShowTooltip(true);
    }
  };
  options2.plugins.tooltip.external = ({ tooltip }) => {
    if (tooltip && tooltip.title) {
      setTimelineVillager(tooltip.title[0]);
      setShowTooltip(true);
    }
  };

  const [barOptions, setBarOptions] = useState(options);

  const handleClose = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  useEffect(() => {
    setOpenSnackbar(smallScreen);
  }, [smallScreen]);

  useEffect(() => {
    if (timelineMode) {
      setBarOptions(options);
      setBarData(timelineData);
    } else {
      setBarOptions(options2);
      setBarData(timelineData2);
    }
  }, [timelineMode]);

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
      data={{
        labels: timelineLabels,
        datasets: [
          {
            label: 'Villagers',
            data: barData,
            backgroundColor: timelineColors,
          }
        ]
      }}
      options={barOptions}
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
    <Fab
      color="secondary"
      onClick={() => {
        setTimelineMode((mode) => !mode);
      }}
      sx={{
        position: "fixed",
        right: "5%",
        top: "10%",
        ':hover': {
          bgcolor: "white"
        }
      }}>
      <ViewTimelineRoundedIcon />
    </Fab>
  </Box>
}