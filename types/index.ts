import { DialogProps, TooltipProps } from '@mui/material';
import { ImageProps } from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface NameProperties {
  'name-USen': string;
  'name-EUen': string;
  'name-EUde': string;
  'name-EUes': string;
  'name-USes': string;
  'name-EUfr': string;
  'name-USfr': string;
  'name-EUit': string;
  'name-EUnl': string;
  'name-CNzh': string;
  'name-TWzh': string;
  'name-JPja': string;
  'name-KRko': string;
  'name-EUru': string;
}

export interface VillagerProperties {
  id: number;
  'file-name': string;
  name: NameProperties;
  personality: string;
  'birthday-string': string;
  birthday: string;
  species: string;
  gender: string;
  'catch-phrase': string;
  icon_uri: string;
  image_uri: string;
}

export interface MongoProperties {
  name: string;
  startDate: string;
  endDate: string;
  photoDate: string;
  islandmates: string[];
  currentResident: boolean;
  photo: boolean;
  startDateString: string;
  photoDateString: string;
  daysToPhoto: number;
}

export interface MongoPropertiesOrig extends MongoProperties {
  _id: string;
}

export interface HistoryProperties extends MongoProperties {
  duration: number;
  startDateDate: Date;
  endDateDate: Date;
  endDateString: string;
  photoDateDate: Date;
}

interface NH_Details {
  image_url: string;
  photo_url: string;
  icon_url: string;
  quote: string;
  'sub-personality': string;
  catchphrase: string;
  clothing: string;
  clothing_variation: string;
  fav_styles: string[];
  fav_colors: string[];
  hobby: string;
  house_interior_url: string;
  house_exterior_url: string;
  house_wallpaper: string;
  house_flooring: string;
  house_music: string;
  house_music_note: string;
  umbrella: string;
}

export interface VillagerProperties2 {
  url: string;
  name: string;
  alt_name: string;
  title_color: string;
  text_color: string;
  id: string;
  image_url: string;
  species: string;
  personality: string;
  gender: string;
  birthday_month: string;
  birthday_day: string;
  sign: string;
  quote: string;
  phrase: string;
  prev_phrases: string[];
  clothing: string;
  islander: boolean;
  debut: string;
  appearances: string[];
  nh_details: NH_Details;
  ja_name: string;
  ja_phrase: string;
}

export interface TraitProperties {
  trait: string;
  count: number;
  villagers: string[];
}

export interface DurationProperties extends TraitProperties {
  duration: number;
}

export interface PhotoStatsProperties {
  average: number;
  count: number;
}

export interface PhotoStats2Properties {
  shortestAfterGiving: DurationProperties;
  longestAfterGiving: DurationProperties;
  longestWithoutGiving: DurationProperties;
}

export interface CustomDialogProps extends DialogProps {
  zIndex: number;
}

export interface StaticDataProperties {
  currentResidents: string[];
  eventData: EventProperties[];
  genderData: TraitProperties[];
  islandmatesData: TraitProperties[];
  mongoData: MongoProperties[];
  personalityData: TraitProperties[];
  photoData: DurationProperties[];
  photoStats: PhotoStatsProperties;
  speciesData: TraitProperties[];
}

export interface PreparedDataProperties {
  durationData: DurationProperties[];
  histories: Map<string, HistoryProperties>;
  noPhotoData: DurationProperties[];
  photoStats2: PhotoStats2Properties;
  timelineColors: string[];
  timelineColors3: string[];
  timelineData: number[][];
  timelineData2: number[];
  timelineData3: number[];
  timelineLabels: string[];
  timelineLabels3: string[];
  timelineNameIndex: Map<string, number>;
  timelineNameIndex3: Map<string, number>;
}

export interface DataContextProperties extends PreparedDataProperties {
  currentResidents: string[];
  genderData: TraitProperties[];
  islandmatesData: TraitProperties[];
  personalityData: TraitProperties[];
  photoData: DurationProperties[];
  photoStats: PhotoStatsProperties;
  setDialogVillager: Dispatch<SetStateAction<string>>;
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>;
  speciesData: TraitProperties[];
  villagersData: Map<string, VillagerProperties2>;
  eventData: EventProperties[];
}

export interface CustomImageProps extends ImageProps {
  blurColor: string;
}

export interface EventProperties {
  date: string;
  villager: string;
  event: Number;
}

export interface EventPropertiesOrig extends EventProperties {
  _id: string;
}

export interface VillagerTooltipProps extends Omit<TooltipProps, 'title'> {
  villager: string;
}

export interface SearchOptions {
  name: string;
  species: string[];
  personality: string[];
  gender: string;
}

export interface AdvancedSearchOptions {
  residence: string;
  fromDate: string;
  toDate: string;
}

export interface SearchFilter {
  name?: { $regex: string; $options: string };
  species?: { $in: string[] };
  personality?: { $in: string[] };
  gender: string;
}
