interface NameProperties {
  "name-USen": string,
  "name-EUen": string,
  "name-EUde": string,
  "name-EUes": string,
  "name-USes": string,
  "name-EUfr": string,
  "name-USfr": string,
  "name-EUit": string,
  "name-EUnl": string,
  "name-CNzh": string,
  "name-TWzh": string,
  "name-JPja": string,
  "name-KRko": string,
  "name-EUru": string
}

export interface VillagerProperties {
  id: number,
  "file-name": string,
  name: NameProperties,
  personality: string,
  "birthday-string": string,
  "birthday": string,
  species: string,
  gender: string,
  "catch-phrase": string,
  "icon_uri": string,
  "image_uri": string,
}

export interface HistoryProperties {
  name: string,
  startDate: Date,
  endDate: Date,
  currentResident: boolean,
  _id: string,
}