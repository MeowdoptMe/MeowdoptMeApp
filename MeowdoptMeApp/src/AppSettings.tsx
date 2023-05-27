import React from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Modal,
  Text,
} from 'react-native';
import {GeneralButton} from './components/GeneralButton';
import {AppContext, guestUser} from './Context';

interface ChangePasswordModalProps {
  changePasswordModalVisible: boolean;
  setChangePasswordModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChangePasswordModal({
  changePasswordModalVisible,
  setChangePasswordModalVisible,
}: ChangePasswordModalProps) {
  return (
    <Modal visible={changePasswordModalVisible} animationType="slide">
      <ChangePasswordScreen
        setChangePasswordModalVisible={setChangePasswordModalVisible}
      />
    </Modal>
  );
}

interface ChangePasswordScreenProps {
  setChangePasswordModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChangePasswordScreen({
  setChangePasswordModalVisible,
}: ChangePasswordScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* contentContainerStyle={styles.scrollContent}> */}
        {/* <View style={styles.sectionContainer}> */}
        <TextInput
          placeholder="current password"
          placeholderTextColor={'navy'}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="new password"
          placeholderTextColor={'navy'}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="repeat new password"
          placeholderTextColor={'navy'}
          style={styles.inputBox}
        />
        <GeneralButton
          text="Change password"
          onPressOut={() => setChangePasswordModalVisible(true)}
        />
        <GeneralButton
          text="Cancel"
          onPressOut={() => setChangePasswordModalVisible(false)}
        />

        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

interface ChangeMailModalProps {
  changeMailModalVisible: boolean;
  setChangeMailModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChangeMailModal({
  changeMailModalVisible,
  setChangeMailModalVisible,
}: ChangeMailModalProps) {
  return (
    <Modal visible={changeMailModalVisible} animationType="slide">
      <ChangeMailScreen setChangeMailModalVisible={setChangeMailModalVisible} />
    </Modal>
  );
}

interface ChangeMailScreenProps {
  setChangeMailModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChangeMailScreen({setChangeMailModalVisible}: ChangeMailScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          placeholder="new mail"
          placeholderTextColor={'navy'}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="passowrd"
          placeholderTextColor={'navy'}
          style={styles.inputBox}
        />
        <GeneralButton
          text="Change mail"
          onPressOut={() => setChangeMailModalVisible(true)}
        />
        <GeneralButton
          text="Cancel"
          onPressOut={() => setChangeMailModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

interface DeleteAccountModalProps {
  deleteAccountModalVisible: boolean;
  setDeleteAccountModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteAccountModal({
  deleteAccountModalVisible,
  setDeleteAccountModalVisible,
}: DeleteAccountModalProps) {
  return (
    <Modal visible={deleteAccountModalVisible} animationType="slide">
      <DeleteAccountScreen
        setDeleteAccountModalVisible={setDeleteAccountModalVisible}
      />
    </Modal>
  );
}

interface DeleteAccountScreenProps {
  setDeleteAccountModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteAccountScreen({
  setDeleteAccountModalVisible,
}: DeleteAccountScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          placeholder="password"
          placeholderTextColor={'navy'}
          style={styles.inputBox}
        />
        <GeneralButton
          text="Delete account"
          onPressOut={() => setDeleteAccountModalVisible(true)}
        />
        <GeneralButton
          text="Cancel"
          onPressOut={() => setDeleteAccountModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

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

export {ChangePasswordModal, ChangeMailModal, DeleteAccountModal, LogoutModal};
