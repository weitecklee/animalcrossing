import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import About from '../components/about';
import Cards from '../components/cards';
import IndexComponent from '../components/indexComponent';
import Stats from '../components/stats';
import TopBar from '../components/topBar';
import VillagerDialog from '../components/villagerDialog';
import { villagersData } from '../lib/combinedData';
import { DurationProperties, HistoryProperties, MongoProperties, PhotoStats2Properties, PhotoStatsProperties, TraitProperties } from '../types';
import { calculateDays } from '../lib/functions';

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

export default function HomePage({ mongoData, speciesData, personalityData, genderData, photoData, photoStats, currentResidents, contemporariesData }: {
  mongoData: MongoProperties[],
  speciesData: TraitProperties[],
  personalityData: TraitProperties[],
  genderData: TraitProperties[],
  photoData: DurationProperties[],
  photoStats: PhotoStatsProperties,
  currentResidents: string[],
  contemporariesData: DurationProperties[],
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

  useEffect(() => {
    const tmpHistories: Map<string,HistoryProperties> = new Map();
    const tmpPhotoStats2: PhotoStats2Properties = {
      shortestAfterReceiving: {
        trait: '',
        count: 0,
        villagers: [],
        duration: 10000,
      },
      longestAfterReceiving: {
        trait: '',
        count: 0,
        villagers: [],
        duration: 0,
      },
      longestWithoutReceiving: {
        trait: '',
        count: 0,
        villagers: [],
        duration: 0,
      },
    }

    const labels: string[] = [];
    const timeData: string[][] = [];
    const backgroundColor: string[] = [];
    const durationMap: Map<number, DurationProperties> = new Map();
    const durationData: number[] = [];
    const nameIndex: Map<string, number> = new Map();
    let i = 0;

    for (const mongoDatum of mongoData) {
      const tmpHist: HistoryProperties = {
        ... mongoDatum
      } as HistoryProperties;
      tmpHist.startDateDate = new Date(mongoDatum.startDate);
      if (!mongoDatum.endDate) {
        tmpHist.endDateDate = new Date();
        tmpHist.endDateDate.setHours(0, 0, 0);
      } else {
        tmpHist.endDateDate = new Date(mongoDatum.endDate);
      }
      if (mongoDatum.photo) {
        tmpHist.photoDateDate = new Date(mongoDatum.photoDate);
        const stayAfterReceiving = calculateDays(tmpHist.photoDateDate, tmpHist.endDateDate);
        if (!mongoDatum.currentResident) {
          if (stayAfterReceiving < tmpPhotoStats2.shortestAfterReceiving.duration) {
            tmpPhotoStats2.shortestAfterReceiving.duration = stayAfterReceiving;
            tmpPhotoStats2.shortestAfterReceiving.villagers = [mongoDatum.name];
          } else if (stayAfterReceiving === tmpPhotoStats2.shortestAfterReceiving.duration) {
            tmpPhotoStats2.shortestAfterReceiving.villagers.push(mongoDatum.name);
          }
        }
        if (stayAfterReceiving > tmpPhotoStats2.longestAfterReceiving.duration) {
          tmpPhotoStats2.longestAfterReceiving.duration = stayAfterReceiving;
          tmpPhotoStats2.longestAfterReceiving.villagers = [mongoDatum.name];
        } else if (stayAfterReceiving === tmpPhotoStats2.longestAfterReceiving.duration) {
          tmpPhotoStats2.longestAfterReceiving.villagers.push(mongoDatum.name);
        }
      }
      tmpHist.endDateString = tmpHist.endDateDate.toLocaleDateString("fr-CA");
      tmpHist.duration = calculateDays(tmpHist.startDateDate, tmpHist.endDateDate);
      if (!durationMap.has(tmpHist.duration)) {
        durationMap.set(tmpHist.duration, {
          trait: tmpHist.duration.toString(),
          count: 0,
          villagers: [],
          duration: tmpHist.duration,
        })
      }
      const tmpDuration = durationMap.get(tmpHist.duration)!;
      tmpDuration.count++;
      tmpDuration.villagers.push(tmpHist.name);
      tmpHistories.set(tmpHist.name, tmpHist);
      labels.push(mongoDatum.name);
      timeData.push([tmpHist.startDateString, tmpHist.endDateString])
      backgroundColor.push('#' + villagersData.get(tmpHist.name)?.title_color!)
      durationData.push(tmpHist.duration);
      nameIndex.set(tmpHist.name, i);
      i++;
    }

    const tmpDurations = Array.from(durationMap.values());
    tmpDurations.sort((a, b) => b.duration - a.duration);

    const durationData2: number[] = [];
    const labels2: string[] = [];
    const colors2: string[] = [];
    const nameIndex2: Map<string, number> = new Map();
    i = 0;

    for (const duration of tmpDurations) {
      for (const villager of duration.villagers) {
        labels2.push(villager);
        durationData2.push(duration.duration);
        colors2.push('#' + villagersData.get(villager)?.title_color!);
        nameIndex2.set(villager, i);
        i++;
      }
    }

    let found = false;
    for (const duration of tmpDurations) {
      for (const villager of duration.villagers) {
        if (!(tmpHistories.get(villager)!.photo)) {
          tmpPhotoStats2.longestWithoutReceiving.duration = duration.duration;
          tmpPhotoStats2.longestWithoutReceiving.villagers.push(villager);
          found = true;
        }
      }
      if (found) {
        break;
      }
    }

    tmpPhotoStats2.shortestAfterReceiving.trait = tmpPhotoStats2.shortestAfterReceiving.duration.toString();
    tmpPhotoStats2.longestWithoutReceiving.trait = tmpPhotoStats2.longestWithoutReceiving.duration.toString();

    setHistories(tmpHistories);
    setTimelineData(timeData);
    setTimelineData2(durationData);
    setTimelineLabels(labels);
    setTimelineColors(backgroundColor);
    setDurationData(tmpDurations);
    setTimelineData3(durationData2);
    setTimelineLabels3(labels2);
    setTimelineColors3(colors2);
    setTimelineNameIndex(nameIndex);
    setTimelineNameIndex3(nameIndex2);
    setPhotoStats2(tmpPhotoStats2);
  }, [mongoData])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [component]);

  return (<>
    <Head>
      <title>My Animal Crossing Island</title>
    </Head>
    <ThemeProvider theme={theme}>
      <TopBar component={component} setComponent={setComponent} />
      {component === 'Index' && <IndexComponent />}
      {component === 'Villagers' && <Cards
        villagersData={villagersData}
        histories={histories}
        setDialogVillager={setDialogVillager}
        setShowVillagerDialog={setShowVillagerDialog}
      />}
      {component === 'Timeline' && <Timeline
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
      />}
      {component === 'Stats' && <Stats
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
        contemporariesData={contemporariesData}
      />}
      {component === 'About' && <About />}
      <VillagerDialog
        history={histories.get(dialogVillager)!}
        villagerData={villagersData.get(dialogVillager)!}
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
    contemporariesData: TraitProperties[],
  };
}> {

  const payload = {
    dataSource: 'AnimalCrossing',
    database: 'lasagnark',
    collection: 'history',
    filter: {},
  }

  const res = await fetch(`${process.env.api_url}/action/find`, {
    method: 'POST',
    headers: {
      'api-key': `${process.env.api_key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const mongoResponse = await res.json();
  const mongoData: MongoProperties[] = mongoResponse.documents;

  const speciesMap: Map<string, TraitProperties> = new Map();
  const personalityMap: Map<string, TraitProperties> = new Map();
  const genderMap: Map<string, TraitProperties> = new Map();
  const photoMap: Map<number, DurationProperties> = new Map();
  const contemporariesMap: Map<number, DurationProperties> = new Map();
  const photoStats: PhotoStatsProperties = {
    average: 0,
    count: 0,
  };
  const currentResidents: string[] = [];

  for (const mongoDatum of mongoData) {
    const startDateDate = new Date(mongoDatum.startDate);
    let endDate: Date;
    if (!mongoDatum.endDate) {
      mongoDatum.currentResident = true;
      endDate = new Date();
      endDate.setHours(0, 0, 0);
      currentResidents.push(mongoDatum.name);
    } else {
      mongoDatum.currentResident = false;
      endDate = new Date(mongoDatum.endDate);
    }
    if (mongoDatum.photoDate) {
      mongoDatum.photo = true
      const photoDateDate = new Date(mongoDatum.photoDate);
      mongoDatum.photoDateString = photoDateDate.toLocaleDateString("fr-CA");
      mongoDatum.daysToPhoto = calculateDays(startDateDate, photoDateDate);
      photoStats.count++;
      photoStats.average += mongoDatum.daysToPhoto;
      if (!photoMap.has(mongoDatum.daysToPhoto)) {
        photoMap.set(mongoDatum.daysToPhoto, {
          trait: mongoDatum.daysToPhoto.toString(),
          count: 0,
          villagers: [],
          duration: mongoDatum.daysToPhoto,
        })
      }
      const tmp = photoMap.get(mongoDatum.daysToPhoto)!;
      tmp.count++;
      tmp.villagers.push(mongoDatum.name);

    } else {
      mongoDatum.photo = false;
    }
    mongoDatum.startDateString = startDateDate.toLocaleDateString("fr-CA");
    const species = villagersData.get(mongoDatum.name)!.species;
    if (!speciesMap.has(species)) {
      speciesMap.set(species, {
        trait: species,
        count: 0,
        villagers: [],
      });
    }
    const tmp = speciesMap.get(species)!;
    tmp.count++;
    tmp.villagers.push(mongoDatum.name);
    const personality = villagersData.get(mongoDatum.name)!.personality;
    if (!personalityMap.has(personality)) {
      personalityMap.set(personality, {
        trait: personality,
        count: 0,
        villagers: [],
      });
    }
    const tmp2 = personalityMap.get(personality)!;
    tmp2.count++;
    tmp2.villagers.push(mongoDatum.name);
    const gender = villagersData.get(mongoDatum.name)!.gender;
    if (!genderMap.has(gender)) {
      genderMap.set(gender, {
        trait: gender,
        count: 0,
        villagers: [],
      });
    }
    const tmp3 = genderMap.get(gender)!;
    tmp3.count++;
    tmp3.villagers.push(mongoDatum.name);
    if (!contemporariesMap.has(mongoDatum.contemporaries.length)) {
      contemporariesMap.set(mongoDatum.contemporaries.length, {
        trait: mongoDatum.contemporaries.length.toString(),
        count: 0,
        villagers: [],
        duration: mongoDatum.contemporaries.length,
      });
    }
    const tmp4 = contemporariesMap.get(mongoDatum.contemporaries.length)!;
    tmp4.count++;
    tmp4.villagers.push(mongoDatum.name);
  }

  const speciesData = Array.from(speciesMap.values());
  speciesData.sort((a, b) => b.count - a.count);
  const personalityData = Array.from(personalityMap.values());
  personalityData.sort((a, b) => b.count - a.count);
  const genderData = Array.from(genderMap.values());
  genderData.sort((a, b) => b.count - a.count);
  const photoData = Array.from(photoMap.values());
  photoData.sort((a, b) => a.duration - b.duration);
  photoStats.average /= photoStats.count;
  const contemporariesData = Array.from(contemporariesMap.values());
  contemporariesData.sort((a, b) => b.duration - a.duration);

  return {
    props: {
      mongoData,
      speciesData,
      personalityData,
      genderData,
      photoData,
      photoStats,
      currentResidents,
      contemporariesData,
    }
  }
}

export const metadata = {
  title: 'My Animal Crossing Island',
}