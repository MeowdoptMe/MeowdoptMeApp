import React from 'react';
import InfoEdit from './InfoEdit';
import InfoView from './ShelterView';

interface ShelterEditScreenProps {
  setNameVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ShelterEditScreen({setNameVisible}: ShelterEditScreenProps) {
  const [EditMode, setEditMode] = React.useState(false);
  function setEdit(edit: boolean) {
    setNameVisible(!edit);
    setEditMode(edit);
  }

  return EditMode ? (
    <InfoEdit setEdit={setEdit} />
  ) : (
    <InfoView setEdit={setEdit} />
  );
}

export default ShelterEditScreen;
