import { villagersData } from '../lib/combinedData';
import { calculateDays } from '../lib/functions';
import {
  DurationProperties,
  HistoryProperties,
  MongoProperties,
  PhotoStats2Properties,
  PreparedDataProperties,
} from '../types';

const currentDate = new Date();
currentDate.setHours(0, 0, 0);
const endDate = new Date();
endDate.setDate(currentDate.getDate() + 30);
endDate.setHours(0, 0, 0);

export default function prepareData(
  mongoData: MongoProperties[]
): PreparedDataProperties {
  const histories: Map<string, HistoryProperties> = new Map();
  const photoStats2: PhotoStats2Properties = {
    shortestAfterGiving: {
      trait: '',
      count: 0,
      villagers: [],
      duration: 10000,
    },
    longestAfterGiving: {
      trait: '',
      count: 0,
      villagers: [],
      duration: 0,
    },
    longestWithoutGiving: {
      trait: '',
      count: 0,
      villagers: [],
      duration: 0,
    },
  };

  const timelineLabels: string[] = [];
  const timelineData: number[][] = [];
  const timelineColors: string[] = [];
  const durationMap: Map<number, DurationProperties> = new Map();
  const timelineData2: number[] = [];
  const timelineNameIndex: Map<string, number> = new Map();
  const noPhotoMap: Map<number, DurationProperties> = new Map();
  let i = 0;

  for (const mongoDatum of mongoData) {
    const tmpHist: HistoryProperties = {
      ...mongoDatum,
    } as HistoryProperties;
    tmpHist.startDateDate = new Date(mongoDatum.startDate);
    if (tmpHist.startDateDate > currentDate) {
      continue;
    }
    if (!mongoDatum.endDate) {
      tmpHist.endDateDate = endDate;
      tmpHist.duration = calculateDays(tmpHist.startDateDate, currentDate);
    } else {
      tmpHist.endDateDate = new Date(mongoDatum.endDate);
      tmpHist.duration = calculateDays(
        tmpHist.startDateDate,
        tmpHist.endDateDate
      );
    }
    tmpHist.endDateString = tmpHist.endDateDate.toLocaleDateString('en-ZA');
    if (mongoDatum.photo) {
      tmpHist.photoDateDate = new Date(mongoDatum.photoDate);
      const stayAfterGiving = calculateDays(
        tmpHist.photoDateDate,
        tmpHist.endDateDate
      );
      if (!mongoDatum.currentResident) {
        if (stayAfterGiving < photoStats2.shortestAfterGiving.duration) {
          photoStats2.shortestAfterGiving.duration = stayAfterGiving;
          photoStats2.shortestAfterGiving.villagers = [mongoDatum.name];
        } else if (
          stayAfterGiving === photoStats2.shortestAfterGiving.duration
        ) {
          photoStats2.shortestAfterGiving.villagers.push(mongoDatum.name);
        }
      }
      if (stayAfterGiving > photoStats2.longestAfterGiving.duration) {
        photoStats2.longestAfterGiving.duration = stayAfterGiving;
        photoStats2.longestAfterGiving.villagers = [mongoDatum.name];
      } else if (stayAfterGiving === photoStats2.longestAfterGiving.duration) {
        photoStats2.longestAfterGiving.villagers.push(mongoDatum.name);
      }
    } else {
      if (!noPhotoMap.has(tmpHist.duration)) {
        noPhotoMap.set(tmpHist.duration, {
          trait: tmpHist.duration.toString(),
          count: 0,
          villagers: [],
          duration: tmpHist.duration,
        });
      }
      const tmp = noPhotoMap.get(tmpHist.duration)!;
      tmp.count++;
      tmp.villagers.push(tmpHist.name);
    }
    if (!durationMap.has(tmpHist.duration)) {
      durationMap.set(tmpHist.duration, {
        trait: tmpHist.duration.toString(),
        count: 0,
        villagers: [],
        duration: tmpHist.duration,
      });
    }
    const tmpDuration = durationMap.get(tmpHist.duration)!;
    tmpDuration.count++;
    tmpDuration.villagers.push(tmpHist.name);
    histories.set(tmpHist.name, tmpHist);
    timelineLabels.push(mongoDatum.name);
    timelineData.push([
      tmpHist.startDateDate.valueOf(),
      tmpHist.endDateDate.valueOf(),
    ]);
    timelineColors.push('#' + villagersData.get(tmpHist.name)?.title_color!);
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

  const noPhotoData = Array.from(noPhotoMap.values());
  noPhotoData.sort((a, b) => b.duration - a.duration);

  photoStats2.longestWithoutGiving = noPhotoData[0];
  photoStats2.longestAfterGiving.trait =
    photoStats2.longestAfterGiving.duration.toString();
  photoStats2.shortestAfterGiving.trait =
    photoStats2.shortestAfterGiving.duration.toString();

  return {
    durationData,
    histories,
    noPhotoData,
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
  };
}
