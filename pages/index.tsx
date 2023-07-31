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
import { CustomFadeProps, DataContextProperties, PreparedDataProperties, StaticDataProperties } from '../types';

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

const CustomFade = ({active, ...props}: CustomFadeProps) => (
  <Fade
    {...props}
    in={active}
    style={{
      transitionDelay: (active ? fadeTimeout.exit : 0) + 'ms',
    }}
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
    const preppedData = prepareData(mongoData);
    setPreparedData(preppedData);
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
              active={component === 'Index'}
            >
              <CustomBox>
                <IndexComponent />
              </CustomBox>
            </CustomFade>
            <CustomFade
              active={component === 'Villagers'}
            >
              <CustomBox>
                <Cards />
              </CustomBox>
            </CustomFade>
            <CustomFade
              active={component === 'Timeline'}
            >
              <CustomBox>
                <Timeline />
              </CustomBox>
            </CustomFade>
            <CustomFade
              active={component === 'Stats'}
            >
              <CustomBox>
                <Stats />
              </CustomBox>
            </CustomFade>
            <CustomFade
              active={component === 'About'}
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

  const staticData = await getData();

  return {
    props: staticData,
  }
}

export const metadata = {
  title: 'My Animal Crossing Island',
}