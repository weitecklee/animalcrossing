import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Chip, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { PERSONALITIES, SPECIES } from '../lib/variables';

const handleChips = (map: Map<string, boolean>) => Array.from(map).filter(([k, v]) => v).map(([k, v]) => <Chip key={k} label={k}/>);

const handleCheckbox = (setCheckbox: Dispatch<SetStateAction<Map<string, boolean>>>,  key: string) => {
  setCheckbox((prevState) => {
    const newState = new Map(prevState);
    newState.set(key, !prevState.get(key));
    return newState;
  })
}

function CheckboxAccordion({ checkboxTitle, checkboxArray, checkboxMap, setCheckboxMap} : {
  checkboxTitle: string,
  checkboxArray: Array<string>,
  checkboxMap: Map<string, boolean>,
  setCheckboxMap: Dispatch<SetStateAction<Map<string, boolean>>>
}) {
  return <Accordion>
  <AccordionSummary expandIcon={<ExpandMore />}>
    {checkboxTitle}
    {handleChips(checkboxMap)}
  </AccordionSummary>
  <AccordionDetails>
    <FormGroup>
      {checkboxArray.map((p) => (
        <FormControlLabel
          control={<Checkbox
            checked={checkboxMap.get(p)}
            onChange={() => handleCheckbox(setCheckboxMap, p)}
          />}
          label={p}
          key={p}
        />
      ))}
    </FormGroup>
  </AccordionDetails>
</Accordion>
}

export default function Search() {

  const [personalitiesMap, setPersonalitiesMap]= useState<Map<string, boolean>>(new Map(PERSONALITIES.map((key) => [key, false])));
  const [speciesMap, setSpeciesMap]= useState<Map<string, boolean>>(new Map(SPECIES.map((key) => [key, false])));

  return <>
    <Typography>
      Search by
    </Typography>
    <TextField
      id='name'
      label='Name'
    />
    <CheckboxAccordion
      checkboxTitle='Species'
      checkboxArray={SPECIES}
      checkboxMap={speciesMap}
      setCheckboxMap={setSpeciesMap}
    />
    <CheckboxAccordion
      checkboxTitle='Personalities'
      checkboxArray={PERSONALITIES}
      checkboxMap={personalitiesMap}
      setCheckboxMap={setPersonalitiesMap}
    />
  </>
}