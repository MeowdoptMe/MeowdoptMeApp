import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Modal, Text} from 'react-native';
import {GeneralButton} from '../components/GeneralButton';
import {AppContext, guestUser} from '../Context';

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
  // useContext(AppContext).setIsStartingScreen(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text> "Do you want to logout for sure?"</Text>
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
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },

  // sectionContainer: {
  //   //flexGrow: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'white',
  //   // maxWidth: 200,
  //   // maxHeight: 200,
  // },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  inputBox: {
    width: 200,
    margin: 5,
    color: 'black',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
  },
});

export {LogoutModal};
