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

interface NH_Details {
  image_url: string,
  photo_url: string,
  icon_url: string,
  quote: string,
  "sub-personality": string,
  catchphrase: string,
  clothing: string,
  clothing_variation: string,
  fav_styles: string[],
  fav_colors: string[],
  hobby: string,
  house_interior_url: string,
  house_exterior_url: string,
  house_wallpaper: string,
  house_flooring: string,
  house_music: string,
  house_music_note: string,
}

export interface VillagerProperties2 {
  url: string,
  name: string,
  alt_name: string,
  title_color: string,
  text_color: string,
  id: string,
  image_url: string,
  species: string,
  personality: string,
  gender: string,
  birthday_month: string,
  birthday_day: string,
  sign: string,
  quote: string,
  phrase: string,
  prev_phrases: string[],
  clothing: string,
  islander: boolean,
  debut: string,
  appearances: string[],
  nh_details: NH_Details,
  ja_name: string,
}

interface DatasetProperties {
  label: string,
  data: any[],
}

export interface TimelineDataProperties {
  labels: string[],
  datasets: DatasetProperties[],
}