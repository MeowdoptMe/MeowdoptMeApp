import React, {useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Modal,
  Text,
} from 'react-native';
import {GeneralButton} from '../components/GeneralButton';
import {AppContext, guestUser} from '../Context';
import authUtils from '../authUtils';
import {useState} from 'react';
import {Stats} from 'fs';
import Status from '../components/Status';
import colorPalette from '../../assets/colors';

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
    <SafeAreaView style={styles.scrollViewContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          placeholder="password"
          placeholderTextColor={'navy'}
          secureTextEntry={true}
          style={styles.inputBox}
        />
        <GeneralButton text="Delete account" onPressOut={() => {}} />
        <GeneralButton
          text="Cancel"
          onPressOut={() => setDeleteAccountModalVisible(false)}
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
  // container: {
  //   backgroundColor: 'black',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  scrollContent: {
    // backgroundColor: 'purple',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexGrow: 1,
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

export {DeleteAccountModal};
