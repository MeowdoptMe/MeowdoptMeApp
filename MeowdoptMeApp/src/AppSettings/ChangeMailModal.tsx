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
  const {user, setUser} = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function onPressOut() {
    if (mail === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }
    if (authUtils.isValidEmail(mail) === false) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      const oldMail = user.mail;
      const newMail = mail;
      const username = user.username;
      const token = await authUtils.login(username, password);
      setUser({
        username: username,
        mail: oldMail,
        token,
      });

      await authUtils.changeMail(newMail, token);
      setError(undefined);
      setUser({
        username: username,
        mail: newMail,
        token,
      });
      setChangeMailModalVisible(false);
    } catch (e) {
      console.log(e);
      setError(e as string);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          placeholder="new mail"
          placeholderTextColor={'navy'}
          style={styles.inputBox}
          value={mail}
          onChangeText={text => {
            setMail(text);
          }}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor={'navy'}
          style={styles.inputBox}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <Status error={error} loading={loading} />
        <GeneralButton
          text="Change mail"
          onPressOut={onPressOut}
          disabled={loading}
        />
        <GeneralButton
          text="Cancel"
          onPressOut={() => setChangeMailModalVisible(false)}
          disabled={loading}
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

export {ChangeMailModal};
