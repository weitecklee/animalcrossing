import { Box, BoxProps, Fade, FadeProps } from '@mui/material';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { forwardRef, useEffect, useState } from 'react';
import About from '../components/about';
import Cards from '../components/cards';
import IndexComponent from '../components/indexComponent';
import Stats from '../components/stats';
import TopBar from '../components/topBar';
import VillagerDialog from '../components/villagerDialog';
import { villagersData } from '../lib/combinedData';
import getData from '../lib/getData';
import prepareData from '../lib/prepareData';
import { DurationProperties, HistoryProperties, MongoProperties, PhotoStats2Properties, PhotoStatsProperties, TraitProperties } from '../types';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: "#418869",
    },
    secondary: {
      main: "#79d6c2",
    },
    success: {
      main: "#F5F7E1"
    }
  },
  typography: {
    fontFamily: "Montserrat",
    title: {
      fontFamily: "Coustard", // Zilla Slab, Sanchez
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: "Coustard",
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        label: {
          fontFamily: "Coustard",
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme, {
  breakpoints: ['md'],
  factor: 2,
});

const Timeline = dynamic(() => import('../components/timeline'), {ssr: false})

const fadeTimeout = {
  appear: 500,
  enter: 500,
  exit: 500,
};

const CustomFade = ({...props}: FadeProps) => (
  <Fade
    {...props}
    unmountOnExit
    appear
    timeout={fadeTimeout}
  />
);

const CustomBox = forwardRef((props: BoxProps, ref) => (
  <Box
    {...props}
    ref={ref}
    position='absolute'
    width='calc(100% - 16px)'
  />
));
CustomBox.displayName = 'CustomBox';

export default function HomePage({ mongoData, speciesData, personalityData, genderData, photoData, photoStats, currentResidents, islandmatesData }: {
  mongoData: MongoProperties[],
  speciesData: TraitProperties[],
  personalityData: TraitProperties[],
  genderData: TraitProperties[],
  photoData: DurationProperties[],
  photoStats: PhotoStatsProperties,
  currentResidents: string[],
  islandmatesData: DurationProperties[],
}) {

  const [histories, setHistories] = useState<Map<string,HistoryProperties>>(new Map());
  const [component, setComponent] =  useState('Index');
  const [timelineData, setTimelineData] = useState<string[][]>([]);
  const [timelineData2, setTimelineData2] = useState<number[]>([]);
  const [timelineData3, setTimelineData3] = useState<number[]>([]);
  const [timelineLabels, setTimelineLabels] = useState<string[]>([]);
  const [timelineLabels3, setTimelineLabels3] = useState<string[]>([]);
  const [timelineColors, setTimelineColors] = useState<string[]>([]);
  const [timelineColors3, setTimelineColors3] = useState<string[]>([]);
  const [durationData, setDurationData] = useState<DurationProperties[]>([]);
  const [showVillagerDialog, setShowVillagerDialog] = useState(false);
  const [dialogVillager, setDialogVillager] = useState('');
  const [timelineNameIndex, setTimelineNameIndex] = useState<Map<string, number>>(new Map());
  const [timelineNameIndex3, setTimelineNameIndex3] = useState<Map<string, number>>(new Map());
  const [photoStats2, setPhotoStats2] = useState<PhotoStats2Properties>({} as PhotoStats2Properties);
  const [allReady, setAllReady] = useState(false);

  useEffect(() => {
    const {
      durationData,
      histories,
      photoStats2,
      timelineColors,
      timelineColors3,
      timelineData,
      timelineData2,
      timelineData3,
      timelineLabels,
      timelineLabels3,
      timelineNameIndex,
      timelineNameIndex3,
    } = prepareData(mongoData);

    setHistories(histories);
    setTimelineData(timelineData);
    setTimelineData2(timelineData2);
    setTimelineLabels(timelineLabels);
    setTimelineColors(timelineColors);
    setDurationData(durationData);
    setTimelineData3(timelineData3);
    setTimelineLabels3(timelineLabels3);
    setTimelineColors3(timelineColors3);
    setTimelineNameIndex(timelineNameIndex);
    setTimelineNameIndex3(timelineNameIndex3);
    setPhotoStats2(photoStats2);
  }, [mongoData])

  useEffect(() => {
    if (
      histories.size != 0 &&
      timelineData.length != 0 &&
      timelineData2.length != 0 &&
      timelineData3.length != 0 &&
      timelineLabels.length != 0 &&
      timelineLabels3.length != 0 &&
      timelineColors.length != 0 &&
      timelineColors3.length != 0 &&
      durationData.length != 0 &&
      timelineNameIndex.size != 0 &&
      timelineNameIndex3.size != 0 &&
      photoStats2.longestAfterReceiving !== undefined
    ) {
      setAllReady(true);
    }
  }, [histories, timelineData, timelineData2, timelineData3, timelineLabels, timelineLabels3, timelineColors, timelineColors3, durationData, timelineNameIndex, timelineNameIndex3, photoStats2]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [component]);

  return (<>
    <Head>
      <title>My Animal Crossing Island</title>
    </Head>
    <ThemeProvider theme={theme}>
      <TopBar component={component} setComponent={setComponent} />
      {allReady && <>
        <CustomFade
          in={component === 'Index'}
          style={{
            transitionDelay: (component === 'Index' ? fadeTimeout.exit : 0) + 'ms',
          }}
        >
          <CustomBox>
            <IndexComponent />
          </CustomBox>
        </CustomFade>
        <CustomFade
          in={component === 'Villagers'}
          style={{
            transitionDelay: (component === 'Villagers' ? fadeTimeout.exit : 0) + 'ms',
          }}
        >
          <CustomBox>
            <Cards
              villagersData={villagersData}
              histories={histories}
              setDialogVillager={setDialogVillager}
              setShowVillagerDialog={setShowVillagerDialog}
            />
          </CustomBox>
        </CustomFade>
        <CustomFade
          in={component === 'Timeline'}
          style={{
            transitionDelay: (component === 'Timeline' ? fadeTimeout.exit : 0) + 'ms',
          }}
        >
          <CustomBox>
            <Timeline
              timelineData={timelineData}
              timelineData2={timelineData2}
              villagersData={villagersData}
              histories={histories}
              timelineLabels={timelineLabels}
              timelineColors={timelineColors}
              timelineData3={timelineData3}
              timelineLabels3={timelineLabels3}
              timelineColors3={timelineColors3}
              setDialogVillager={setDialogVillager}
              setShowVillagerDialog={setShowVillagerDialog}
              timelineNameIndex={timelineNameIndex}
              timelineNameIndex3={timelineNameIndex3}
            />
          </CustomBox>
        </CustomFade>
        <CustomFade
          in={component === 'Stats'}
          style={{
            transitionDelay: (component === 'Stats' ? fadeTimeout.exit : 0) + 'ms',
          }}
        >
          <CustomBox>
            <Stats
              villagersData={villagersData}
              histories={histories}
              durationData={durationData}
              speciesData={speciesData}
              personalityData={personalityData}
              genderData={genderData}
              photoData={photoData}
              photoStats={photoStats}
              photoStats2={photoStats2}
              currentResidents={currentResidents}
              setDialogVillager={setDialogVillager}
              setShowVillagerDialog={setShowVillagerDialog}
              islandmatesData={islandmatesData}
            />
          </CustomBox>
        </CustomFade>
        <CustomFade
          in={component === 'About'}
          style={{
            transitionDelay: (component === 'About' ? fadeTimeout.exit : 0) + 'ms',
          }}
        >
          <CustomBox>
            <About />
          </CustomBox>
        </CustomFade>
      </>}
      <VillagerDialog
        histories={histories}
        villagersData={villagersData}
        dialogVillager={dialogVillager}
        setDialogVillager={setDialogVillager}
        showVillagerDialog={showVillagerDialog}
        setShowVillagerDialog={setShowVillagerDialog}
      />
    </ThemeProvider>
  </>)
}

export async function getStaticProps(): Promise<{
  props: {
    mongoData: MongoProperties[],
    speciesData: TraitProperties[],
    personalityData: TraitProperties[],
    genderData: TraitProperties[],
    photoData: DurationProperties[],
    photoStats: PhotoStatsProperties,
    currentResidents: string[],
    islandmatesData: TraitProperties[],
  };
}> {

  const data = await getData();
  const {
    mongoData,
    speciesData,
    personalityData,
    genderData,
    photoData,
    photoStats,
    currentResidents,
    islandmatesData,
  } = data;

  return {
    props: {
      mongoData,
      speciesData,
      personalityData,
      genderData,
      photoData,
      photoStats,
      currentResidents,
      islandmatesData,
    }
  }
}

export const metadata = {
  title: 'My Animal Crossing Island',
}