import React, {useEffect} from 'react';
import InfoEdit from './InfoEdit';
import InfoView from './InfoView';

interface InfoScreenProps {
  setNameVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function InfoScreen({setNameVisible}: InfoScreenProps) {
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

export default InfoScreen;
