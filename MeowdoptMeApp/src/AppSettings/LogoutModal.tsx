import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Modal, Text} from 'react-native';
import {GeneralButton} from '../components/GeneralButton';
import {AppContext, guestUser} from '../Context';
import colorPalette from '../../assets/colors';

interface LogoutModalProps {
  logoutModalVisible: boolean;
  setLogoutModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function LogoutModal({
  logoutModalVisible,
  setLogoutModalVisible,
}: LogoutModalProps) {
  return (
    <Modal visible={logoutModalVisible} animationType="slide">
      <LogoutScreen setLogoutModalVisible={setLogoutModalVisible} />
    </Modal>
  );
}

interface LogoutScreenProps {
  setLogoutModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function LogoutScreen({setLogoutModalVisible}: LogoutScreenProps) {
  const {setIsStartingScreen, setUser} = React.useContext(AppContext);
  return (
    <SafeAreaView style={styles.scrollViewContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text> Do you want to logout for sure?</Text>
        <GeneralButton
          text="Logout"
          onPressOut={() => {
            setUser(guestUser);
            setIsStartingScreen(true);
          }}
        />
        <GeneralButton
          text="Cancel"
          onPressOut={() => setLogoutModalVisible(false)}
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
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  inputBox: {
    backgroundColor: colorPalette.lightAccentColor,
    width: 200,
    height: 50,
    margin: 5,
    color: 'black',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
  },
});

export {LogoutModal};
