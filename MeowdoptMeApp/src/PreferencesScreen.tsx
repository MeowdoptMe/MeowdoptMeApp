import React from 'react';
import {View, StyleSheet} from 'react-native';

import {
  ChangeMailModal,
  ChangePasswordModal,
  DeleteAccountModal,
  LogoutModal,
} from './AppSettings';
import {GeneralButton} from './components/GeneralButton';

function PreferencesScreen() {
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    React.useState(false);
  const [changeMailModalVisible, setChangeMailModalVisible] =
    React.useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    React.useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = React.useState(false);

  return (
    <View style={styles.sectionContainer}>
      <GeneralButton
        text="Set your filters"
        onPressOut={() => setChangePasswordModalVisible(false)}
      />
      <ChangePasswordModal
        changePasswordModalVisible={changePasswordModalVisible}
        setChangePasswordModalVisible={setChangePasswordModalVisible}
      />
      <GeneralButton
        text={'Change your password'}
        onPressOut={() => setChangePasswordModalVisible(true)}
      />
      <ChangeMailModal
        changeMailModalVisible={changeMailModalVisible}
        setChangeMailModalVisible={setChangeMailModalVisible}
      />
      <GeneralButton
        text={'Change your mail'}
        onPressOut={() => setChangeMailModalVisible(true)}
      />
      <DeleteAccountModal
        deleteAccountModalVisible={deleteAccountModalVisible}
        setDeleteAccountModalVisible={setDeleteAccountModalVisible}
      />
      <GeneralButton
        text="Delete your account"
        onPressOut={() => setDeleteAccountModalVisible(true)}
      />
      <LogoutModal
        logoutModalVisible={logoutModalVisible}
        setLogoutModalVisible={setLogoutModalVisible}
      />
      <GeneralButton
        text="Logout"
        onPressOut={() => setLogoutModalVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  noButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    maxHeight: 40,
    minWidth: 160,
    margin: 5,
  },
  button: {
    backgroundColor: 'royalblue',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    maxHeight: 40,
    minWidth: 160,
    margin: 5,
  },
  modalText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    maxHeight: 300,
  },
});

export default PreferencesScreen;
