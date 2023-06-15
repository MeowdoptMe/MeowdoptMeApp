import React, {useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import {GeneralButton} from '../components/GeneralButton';
import {AppContext} from '../Context';
import authUtils from '../authUtils';
import {useState} from 'react';
import Status from '../components/Status';
import colorPalette from '../../assets/colors';

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
  const {user, setUser} = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');

  async function onPressOut() {
    if (
      currentPassword === '' ||
      newPassword === '' ||
      repeatedPassword === ''
    ) {
      setError('Please fill in all fields');
      return;
    }
    if (newPassword !== repeatedPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      const username = user.username;
      const mail = user.mail;
      const {access} = await authUtils.login(username, currentPassword);
      const id = user.id;
      setUser({
        username,
        mail,
        token: access,
        id,
      });

      await authUtils.changePassword(currentPassword, newPassword, access);
      setError(undefined);
      setChangePasswordModalVisible(false);
    } catch (e) {
      setError(e as string);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.scrollViewContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          placeholder="current password"
          placeholderTextColor={'navy'}
          secureTextEntry={true}
          style={styles.inputBox}
          value={currentPassword}
          onChangeText={text => {
            setCurrentPassword(text);
          }}
        />
        <TextInput
          placeholder="new password"
          placeholderTextColor={'navy'}
          secureTextEntry={true}
          style={styles.inputBox}
          value={newPassword}
          onChangeText={text => {
            setNewPassword(text);
          }}
        />
        <TextInput
          placeholder="repeat new password"
          placeholderTextColor={'navy'}
          secureTextEntry={true}
          style={styles.inputBox}
          value={repeatedPassword}
          onChangeText={text => {
            setRepeatedPassword(text);
          }}
        />
        <Status error={error} loading={loading} />
        <GeneralButton
          text="Change password"
          textStyle={styles.buttonText}
          onPressOut={onPressOut}
          disabled={loading}
        />
        <GeneralButton
          text="Cancel"
          onPressOut={() => setChangePasswordModalVisible(false)}
          disabled={loading}
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
  buttonText: {
    fontSize: 24,
  },
});

export {ChangePasswordModal};
