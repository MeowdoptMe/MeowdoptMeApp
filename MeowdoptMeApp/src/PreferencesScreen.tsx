import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useState} from 'react';
import {
  ChangeMailModal,
  ChangePasswordModal,
  DeleteAccountModal,
  LogoutModal,
} from './AppSettings';
import {GeneralButton} from './components/GeneralButton';

function PreferencesScreen() {
  const [currentOption, setCurrentOption] = useState('none');
  const state = {
    currentOption: currentOption,
    setCurrentOption: setCurrentOption,
  };
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [changeMailModalVisible, setChangeMailModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  return (
    <View style={styles.sectionContainer}>
      {/* <MyButton
        title={'AdFilters'}
        buttonText={'Set your filters'}
        {...state}
      /> */}
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
      {/* <MyButton title={'logout'} buttonText={'Logout'} {...state} /> */}
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

interface myButtonProps {
  title: string;
  buttonText: string;
  currentOption: string;
  setCurrentOption: React.Dispatch<React.SetStateAction<string>>;
}
function MyButton({
  title,
  buttonText,
  currentOption,
  setCurrentOption,
}: myButtonProps) {
  return currentOption !== title ? (
    <Pressable
      style={styles.button}
      onPressOut={() => {
        setCurrentOption(title);
      }}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  ) : (
    <Text style={styles.noButtonText}>{buttonText}</Text>
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
