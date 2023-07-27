import { villagersData } from '../lib/combinedData';
import { calculateDays } from '../lib/functions';
import { DurationProperties, HistoryProperties, MongoProperties, PhotoStats2Properties, PreparedDataProperties } from '../types';

export default function prepareData(mongoData: MongoProperties[]): PreparedDataProperties {

  const histories: Map<string,HistoryProperties> = new Map();
  const photoStats2: PhotoStats2Properties = {
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

  const timelineLabels: string[] = [];
  const timelineData: string[][] = [];
  const timelineColors: string[] = [];
  const durationMap: Map<number, DurationProperties> = new Map();
  const timelineData2: number[] = [];
  const timelineNameIndex: Map<string, number> = new Map();
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
        if (stayAfterReceiving < photoStats2.shortestAfterReceiving.duration) {
          photoStats2.shortestAfterReceiving.duration = stayAfterReceiving;
          photoStats2.shortestAfterReceiving.villagers = [mongoDatum.name];
        } else if (stayAfterReceiving === photoStats2.shortestAfterReceiving.duration) {
          photoStats2.shortestAfterReceiving.villagers.push(mongoDatum.name);
        }
      }
      if (stayAfterReceiving > photoStats2.longestAfterReceiving.duration) {
        photoStats2.longestAfterReceiving.duration = stayAfterReceiving;
        photoStats2.longestAfterReceiving.villagers = [mongoDatum.name];
      } else if (stayAfterReceiving === photoStats2.longestAfterReceiving.duration) {
        photoStats2.longestAfterReceiving.villagers.push(mongoDatum.name);
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
    histories.set(tmpHist.name, tmpHist);
    timelineLabels.push(mongoDatum.name);
    timelineData.push([tmpHist.startDateString, tmpHist.endDateString])
    timelineColors.push('#' + villagersData.get(tmpHist.name)?.title_color!)
    timelineData2.push(tmpHist.duration);
    timelineNameIndex.set(tmpHist.name, i);
    i++;
  }

  const durationData = Array.from(durationMap.values());
  durationData.sort((a, b) => b.duration - a.duration);

  const timelineData3: number[] = [];
  const timelineLabels3: string[] = [];
  const timelineColors3: string[] = [];
  const timelineNameIndex3: Map<string, number> = new Map();
  i = 0;

  for (const duration of durationData) {
    for (const villager of duration.villagers) {
      timelineLabels3.push(villager);
      timelineData3.push(duration.duration);
      timelineColors3.push('#' + villagersData.get(villager)?.title_color!);
      timelineNameIndex3.set(villager, i);
      i++;
    }
  }

  let found = false;
  for (const duration of durationData) {
    for (const villager of duration.villagers) {
      if (!(histories.get(villager)!.photo)) {
        photoStats2.longestWithoutReceiving.duration = duration.duration;
        photoStats2.longestWithoutReceiving.villagers.push(villager);
        found = true;
      }
    }
    if (found) {
      break;
    }
  }

  photoStats2.shortestAfterReceiving.trait = photoStats2.shortestAfterReceiving.duration.toString();
  photoStats2.longestWithoutReceiving.trait = photoStats2.longestWithoutReceiving.duration.toString();

  return {
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
  }
}