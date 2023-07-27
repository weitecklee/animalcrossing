import { Box, BoxProps, Fade, FadeProps, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { createContext, forwardRef, useEffect, useState } from 'react';
import About from '../components/about';
import Cards from '../components/cards';
import IndexComponent from '../components/indexComponent';
import Stats from '../components/stats';
import TopBar from '../components/topBar';
import VillagerDialog from '../components/villagerDialog';
import { villagersData } from '../lib/combinedData';
import getData from '../lib/getData';
import prepareData from '../lib/prepareData';
import { DataContextProperties, PreparedDataProperties, StaticDataProperties } from '../types';

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

export const DataContext = createContext({} as DataContextProperties);
export const ScreenContext = createContext(false);

export default function HomePage({ mongoData, speciesData, personalityData, genderData, photoData, photoStats, currentResidents, islandmatesData }: StaticDataProperties) {

  const [component, setComponent] =  useState('Index');
  const [showVillagerDialog, setShowVillagerDialog] = useState(false);
  const [dialogVillager, setDialogVillager] = useState('');
  const [preparedData, setPreparedData] = useState({} as PreparedDataProperties);
  const [allReady, setAllReady] = useState(false);
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

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

    setPreparedData({
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
    });
  }, [mongoData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [component]);

  useEffect(() => {
    if (Object.keys(preparedData).length > 0) {
      setAllReady(true);
    }
  }, [preparedData]);

  return (<>
    <Head>
      <title>My Animal Crossing Island</title>
    </Head>
    <ThemeProvider theme={theme}>
      <DataContext.Provider value={{
        ...preparedData,
        currentResidents,
        genderData,
        islandmatesData,
        personalityData,
        photoData,
        photoStats,
        setDialogVillager,
        setShowVillagerDialog,
        speciesData,
        villagersData
      }}>
        <ScreenContext.Provider value={mediumScreen}>
          <TopBar
            component={component}
            setComponent={setComponent}
            smallScreen={smallScreen}
          />
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
                <Cards />
              </CustomBox>
            </CustomFade>
            <CustomFade
              in={component === 'Timeline'}
              style={{
                transitionDelay: (component === 'Timeline' ? fadeTimeout.exit : 0) + 'ms',
              }}
            >
              <CustomBox>
                <Timeline />
              </CustomBox>
            </CustomFade>
            <CustomFade
              in={component === 'Stats'}
              style={{
                transitionDelay: (component === 'Stats' ? fadeTimeout.exit : 0) + 'ms',
              }}
            >
              <CustomBox>
                <Stats />
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
            <VillagerDialog
              dialogVillager={dialogVillager}
              showVillagerDialog={showVillagerDialog}
              smallScreen={smallScreen}
            />
          </>}
        </ScreenContext.Provider>
      </DataContext.Provider>
    </ThemeProvider>
  </>)
}

export async function getStaticProps(): Promise<{
  props: StaticDataProperties;
}> {

  const {
    mongoData,
    speciesData,
    personalityData,
    genderData,
    photoData,
    photoStats,
    currentResidents,
    islandmatesData,
  } = await getData();

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