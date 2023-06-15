import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {ChangePasswordModal} from './AppSettings/ChangePasswordModal';
import {ChangeMailModal} from './AppSettings/ChangeMailModal';
import {DeleteAccountModal} from './AppSettings/DeleteAccountModal';
import {LogoutModal} from './AppSettings/LogoutModal';
import {GeneralButton} from './components/GeneralButton';
import colorPalette from '../assets/colors';

function PreferencesScreen() {
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    React.useState(false);
  const [changeMailModalVisible, setChangeMailModalVisible] =
    React.useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    React.useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.scrollViewContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ChangePasswordModal
          changePasswordModalVisible={changePasswordModalVisible}
          setChangePasswordModalVisible={setChangePasswordModalVisible}
        />
        <GeneralButton
          text={'Change your password'}
          extraStyle={styles.button}
          textStyle={styles.buttonText}
          onPressOut={() => setChangePasswordModalVisible(true)}
        />
        <ChangeMailModal
          changeMailModalVisible={changeMailModalVisible}
          setChangeMailModalVisible={setChangeMailModalVisible}
        />
        <GeneralButton
          text={'Change your mail'}
          textStyle={styles.buttonText}
          onPressOut={() => setChangeMailModalVisible(true)}
        />
        <DeleteAccountModal
          deleteAccountModalVisible={deleteAccountModalVisible}
          setDeleteAccountModalVisible={setDeleteAccountModalVisible}
        />
        <GeneralButton
          text="Delete your account"
          extraStyle={styles.button}
          textStyle={styles.buttonText}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: colorPalette.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  noButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    height: 70,
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
