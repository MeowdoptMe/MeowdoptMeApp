import React from 'react';
import InfoEdit from './InfoEdit';
import InfoView from './InfoView';

function InfoScreen() {
  const [EditMode, setEditMode] = React.useState(false);

  return EditMode ? (
    <InfoEdit setEditMode={setEditMode} />
  ) : (
    <InfoView setEditMode={setEditMode} />
  );
}

export default InfoScreen;
