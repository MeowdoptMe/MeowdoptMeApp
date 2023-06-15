import React from 'react';
import InfoEdit from './InfoEdit';
import InfoView from './InfoView';

function InfoScreen() {
  const [editMode, setEditMode] = React.useState(false);

  return editMode ? (
    <InfoEdit setEditMode={setEditMode} />
  ) : (
    <InfoView setEditMode={setEditMode} />
  );
}

export default InfoScreen;
