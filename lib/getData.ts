import { villagersData } from './combinedData';
import { calculateDays } from './functions';
import { DurationProperties, MongoProperties, PhotoStatsProperties, TraitProperties } from '../types';

export default async function getData(): Promise<{
  mongoData: MongoProperties[];
  speciesData: TraitProperties[];
  personalityData: TraitProperties[];
  genderData: TraitProperties[];
  photoData: DurationProperties[];
  photoStats: PhotoStatsProperties;
  currentResidents: string[];
  islandmatesData: DurationProperties[];
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
  const islandmatesMap: Map<number, DurationProperties> = new Map();
  const photoStats: PhotoStatsProperties = {
    average: 0,
    count: 0,
  };
  const currentResidents: string[] = [];

  mongoData.sort((a, b) => a.startDate < b.startDate ? -1 : 1);

  for (const mongoDatum of mongoData) {
    const startDateDate = new Date(mongoDatum.startDate);
    if (!mongoDatum.endDate) {
      mongoDatum.currentResident = true;
      currentResidents.push(mongoDatum.name);
    } else {
      mongoDatum.currentResident = false;
    }
    if (mongoDatum.photoDate) {
      mongoDatum.photo = true
      const photoDateDate = new Date(mongoDatum.photoDate);
      mongoDatum.photoDateString = photoDateDate.toLocaleDateString("en-ZA");
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
    mongoDatum.startDateString = startDateDate.toLocaleDateString("en-ZA");
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
    if (!islandmatesMap.has(mongoDatum.islandmates.length)) {
      islandmatesMap.set(mongoDatum.islandmates.length, {
        trait: mongoDatum.islandmates.length.toString(),
        count: 0,
        villagers: [],
        duration: mongoDatum.islandmates.length,
      });
    }
    const tmp4 = islandmatesMap.get(mongoDatum.islandmates.length)!;
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
  const islandmatesData = Array.from(islandmatesMap.values());
  islandmatesData.sort((a, b) => b.duration - a.duration);

  return {
    mongoData,
    speciesData,
    personalityData,
    genderData,
    photoData,
    photoStats,
    currentResidents,
    islandmatesData,
  };
}