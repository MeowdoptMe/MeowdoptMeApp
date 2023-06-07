import React from 'react';
import InfoEdit from './InfoEdit';
import InfoView from './InfoView';

// interface InfoScreenProps {
//   setNameVisible: React.Dispatch<React.SetStateAction<boolean>>;
// }

function InfoScreen() {
  //const [EditMode, setEditMode] = React.useState(false);
  // function setEdit(edit: boolean) {
  //   setNameVisible(!edit);
  //   setEditMode(edit);
  // }

  // return EditMode ? (
  //   <InfoEdit setEdit={setEdit} />
  // ) : (
  //   <InfoView setEdit={setEdit} />
  // );

  return (
    <InfoView />
  )
}

export default InfoScreen;
