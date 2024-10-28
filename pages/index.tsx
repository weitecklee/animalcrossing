import {
  Box,
  Container,
  CssBaseline,
  Fade,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { createContext, useEffect, useRef, useState } from 'react';
import About from '../components/about';
import Cards from '../components/cards';
import IndexComponent from '../components/indexComponent';
import Stats from '../components/stats';
import TopBar from '../components/topBar';
import VillagerDialog from '../components/villagerDialog';
import { villagersData } from '../lib/combinedData';
import getData from '../lib/getData';
import prepareData from '../lib/prepareData';
import {
  DataContextProperties,
  PreparedDataProperties,
  StaticDataProperties,
} from '../types';
import { theme, fadeTimeout } from '../styles/theme';

const Timeline = dynamic(() => import('../components/timeline'), {
  ssr: false,
});

export const DataContext = createContext({} as DataContextProperties);
export const ScreenContext = createContext({
  mediumScreen: false,
  smallScreen: false,
});

export default function HomePage({
  mongoData,
  speciesData,
  personalityData,
  genderData,
  photoData,
  photoStats,
  currentResidents,
  islandmatesData,
  eventData,
}: StaticDataProperties) {
  const [component, setComponent] = useState('Index');
  const [showVillagerDialog, setShowVillagerDialog] = useState(false);
  const [dialogVillager, setDialogVillager] = useState('');
  const [preparedData, setPreparedData] = useState(
    {} as PreparedDataProperties
  );
  const [allReady, setAllReady] = useState(false);
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  });
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'), {
    noSsr: true,
  });
  const [showFade, setShowFade] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);
  const handleComponentChange = (compo: string) => {
    if (compo !== component) {
      setShowFade(false);
      setTimeout(() => {
        boxRef.current?.scrollTo(0, 0);
        setComponent(compo);
        setShowFade(true);
      }, fadeTimeout.exit);
    }
  };

  useEffect(() => {
    const preppedData = prepareData(mongoData);
    setPreparedData(preppedData);
  }, [mongoData]);

  useEffect(() => {
    if (Object.keys(preparedData).length > 0) {
      setAllReady(true);
    }
  }, [preparedData]);

  return (
    <>
      <Head>
        <title>My Animal Crossing Island</title>
      </Head>
      <ThemeProvider theme={theme}>
        <DataContext.Provider
          value={{
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
            villagersData,
            eventData,
          }}
        >
          <ScreenContext.Provider value={{ mediumScreen, smallScreen }}>
            <TopBar
              component={component}
              setComponent={handleComponentChange}
            />
            {allReady && (
              <CssBaseline>
                <Fade in={showFade} timeout={fadeTimeout}>
                  <Box
                    width="100vw"
                    height={
                      smallScreen ? 'calc(100% - 56px)' : 'calc(100% - 64px)'
                    }
                    pt={1}
                    position="absolute"
                    overflow="auto"
                    id="contentBox"
                    ref={boxRef}
                  >
                    <Container
                      maxWidth="xl"
                      sx={{
                        height: '100%',
                      }}
                    >
                      {component === 'Index' && <IndexComponent />}
                      {component === 'Villagers' && <Cards boxRef={boxRef} />}
                      {component === 'Timeline' && <Timeline />}
                      {component === 'Stats' && <Stats />}
                      {component === 'About' && <About />}
                    </Container>
                  </Box>
                </Fade>
                <VillagerDialog
                  dialogVillager={dialogVillager}
                  showVillagerDialog={showVillagerDialog}
                />
              </CssBaseline>
            )}
          </ScreenContext.Provider>
        </DataContext.Provider>
      </ThemeProvider>
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: StaticDataProperties;
}> {
  const staticData = await getData();
  return {
    props: staticData,
  };
}

export const metadata = {
  title: 'My Animal Crossing Island',
};
