import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import dynamic from 'next/dynamic'
import { MongoProperties, HistoryProperties, TimelineDataProperties, TraitProperties } from '../types';
import TopBar from '../components/topBar';
import IndexComponent from '../components/indexComponent';
import Cards from '../components/cards';
import { villagersData } from '../lib/combinedData';
import Stats from '../components/stats';

let theme = createTheme({
  palette: {
    primary: {
      main: "#c48d3f",
    },
    secondary: {
      main: "#9dffb0",
    },
    success: {
      main: "#1aae5e"
    }
  },
  typography: {
    fontFamily: "Montserrat"
  }
});

theme = responsiveFontSizes(theme, {
  factor: 5
});

const Timeline = dynamic(() => import('../components/timeline'), {ssr: false})

export default function HomePage({ mongoData, speciesData, personalityData, genderData }: {
  mongoData: MongoProperties[],
  speciesData: TraitProperties[],
  personalityData: TraitProperties[],
  genderData: TraitProperties[],
}) {

  const [histories, setHistories] = useState<Map<string,HistoryProperties>>(new Map());
  const [component, setComponent] =  useState('Index');
  const [timelineData, setTimelineData] = useState({} as TimelineDataProperties);
  const [sortedDurations, setSortedDurations] = useState<string[]>([]);

  useEffect(() => {
    const tmpHistories: Map<string,HistoryProperties> = new Map();

    const labels: string[] = [];
    const timeData: string[][] = [];
    const backgroundColor: string[] = [];

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
      }
      tmpHist.endDateString = tmpHist.endDateDate.toLocaleDateString("fr-CA");
      tmpHist.duration = Math.round((tmpHist.endDateDate.getTime() - tmpHist.startDateDate.getTime()) / (1000 * 3600 * 24)) + 1;
      tmpHistories.set(tmpHist.name, tmpHist);
      labels.push(mongoDatum.name);
      timeData.push([tmpHist.startDateString, tmpHist.endDateString])
      backgroundColor.push('#' + villagersData.get(tmpHist.name)?.title_color!)
    }

    const tmpDurations = [... labels];
    tmpDurations.sort((a, b) => tmpHistories.get(b)?.duration! - tmpHistories.get(a)?.duration!);

    setHistories(tmpHistories);
    setTimelineData({
      labels,
      datasets: [
        {
          label: 'Villagers',
          data: timeData,
          backgroundColor,
        }
      ]
    });
    setSortedDurations(tmpDurations);
  }, [mongoData])

  return (<>
    <Head>
      <title>My Animal Crossing Island</title>
    </Head>
    <ThemeProvider theme={theme}>
      <TopBar setComponent={setComponent} />
      {component === 'Index' && <IndexComponent />}
      {component === 'Villagers' && <Cards
        villagersData={villagersData}
        histories={histories}
      />}
      {component === 'Timeline' && <Timeline
        timelineData={timelineData}
        villagersData={villagersData}
        histories={histories}
      />}
      {component === 'Stats' && <Stats
        villagersData={villagersData}
        histories={histories}
        sortedDurations={sortedDurations}
        speciesData={speciesData}
        personalityData={personalityData}
        genderData={genderData}
      />}
    </ThemeProvider>
  </>)
}

export async function getStaticProps(): Promise<{
  props: {
    mongoData: MongoProperties[],
    speciesData: TraitProperties[],
    personalityData: TraitProperties[],
    genderData: TraitProperties[],
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
  const mongoData = mongoResponse.documents;

  const speciesMap: Map<string, TraitProperties> = new Map();
  const personalityMap: Map<string, TraitProperties> = new Map();
  const genderMap: Map<string, TraitProperties> = new Map();

  for (const mongoDatum of mongoData) {
    const startDate = new Date(mongoDatum.startDate);
    let endDate: Date;
    if (!mongoDatum.endDate) {
      mongoDatum.currentResident = true;
      endDate = new Date();
      endDate.setHours(0, 0, 0);
    } else {
      mongoDatum.currentResident = false;
      endDate = new Date(mongoDatum.endDate);
    }
    if (mongoDatum.photoDate) {
      mongoDatum.photo = true
      mongoDatum.photoDateString = new Date(mongoDatum.photoDate).toLocaleDateString("fr-CA");
    } else {
      mongoDatum.photo = false;
    }
    mongoDatum.startDateString = startDate.toLocaleDateString("fr-CA");
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
  }

  const speciesData = Array.from(speciesMap.values());
  speciesData.sort((a, b) => b.count - a.count);
  const personalityData = Array.from(personalityMap.values());
  personalityData.sort((a, b) => b.count - a.count);
  const genderData = Array.from(genderMap.values());
  genderData.sort((a, b) => b.count - a.count);

  return {
    props: {
      mongoData,
      speciesData,
      personalityData,
      genderData,
    }
  }
}

export const metadata = {
  title: 'My Animal Crossing Island',
}