import React from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import {GeneralButton} from '../components/GeneralButton';
import {AppContext, guestUser} from '../Context';
import authUtils from '../authUtils';
import {useState, useContext} from 'react';
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
  const {user, setUser, setIsStartingScreen} = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string>('');

  async function onPressOut() {
    if (password === '') {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const username = user.username;
      const {access} = await authUtils.login(username, password);
      setUser({
        ...user,
        token: access,
      });
      await authUtils.deleteAccount(user.id, access);
      setUser(guestUser);
      setError(undefined);
      setDeleteAccountModalVisible(false);
      setIsStartingScreen(true);
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
          placeholder="password"
          placeholderTextColor={'navy'}
          secureTextEntry={true}
          style={styles.inputBox}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <Status error={error} loading={loading} />
        <GeneralButton
          text="Delete account"
          textStyle={styles.buttonText}
          onPressOut={onPressOut}
          disabled={loading}
        />
        <GeneralButton
          text="Cancel"
          onPressOut={() => setDeleteAccountModalVisible(false)}
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
    fontSize: 26,
  },
});

export {DeleteAccountModal};
