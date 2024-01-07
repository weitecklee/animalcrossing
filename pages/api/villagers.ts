import { villagersData, jpData } from '../../lib/apiData';
import { catchphraseData } from '../../lib/catchphrases';

for (const v of jpData) {
  if (!villagersData.has(v.title.en_name)) {
    console.log(v.title.en_name);
  } else {
    villagersData.get(v.title.en_name).ja_name = v.title.ja_name;
  }
}

const vData = [];

villagersData.forEach((v, k) => {
  if (!catchphraseData.has(v.id)) {
    console.log(v.id);
  } else {
    v.ja_phrase = catchphraseData.get(v.id).JPja;
  }
  vData.push(v);
})

export default function handler(req, res) {
  res.status(200).json(vData);
}