import React from 'react';
import {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import colorPalette from '../assets/colors';

import {AppContext} from './Context';
import authUtils from './authUtils';
import {GeneralButton} from './components/GeneralButton';
import Status from './components/Status';

function StartingScreen() {
  const {setIsStartingScreen} = useContext(AppContext);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);

  return (
    <SafeAreaView style={styles.scrollViewContainer}>
      <LoginModal
        loginModalVisible={loginModalVisible}
        setLoginModalVisible={setLoginModalVisible}
      />
      <RegisterModal
        registerModalVisible={registerModalVisible}
        setRegisterModalVisible={setRegisterModalVisible}
      />
      <ForgotPasswordModal
        forgotPasswordModalVisible={forgotPasswordModalVisible}
        setForgotPasswordModalVisible={setForgotPasswordModalVisible}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.buttonContainer}>
          <Text style={styles.overButtonHintText}>Ready to browse?</Text>
          <GeneralButton
            text="Login"
            onPressOut={() => {
              setLoginModalVisible(true);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.overButtonHintText}>
            Don't have an account yet?
          </Text>
          <GeneralButton
            text="Register"
            onPressOut={() => {
              setRegisterModalVisible(true);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.overButtonHintText}>
            Don't remember your password?
          </Text>

          <GeneralButton
            text="Reset password"
            textStyle={styles.resetPasswordButtonText}
            onPressOut={() => {
              setForgotPasswordModalVisible(true);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.overButtonHintText}>
            Continue without an account?
          </Text>
          <GeneralButton
            text="Skip"
            onPressOut={() => {
              setIsStartingScreen(false);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface LoginModalProps {
  loginModalVisible: boolean;
  setLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginModal({
  loginModalVisible,
  setLoginModalVisible,
}: LoginModalProps) {
  return (
    <Modal visible={loginModalVisible} animationType="slide">
      <LoginScreen setLoginModalVisible={setLoginModalVisible} />
    </Modal>
  );
}

interface LoginScreenProps {
  setLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginScreen({setLoginModalVisible}: LoginScreenProps) {
  const {user, setUser, setIsStartingScreen} = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function onPressOut() {
    if (username === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const sleepPromise = authUtils.sleep();
      const token = await authUtils.login(username, password);
      await sleepPromise;
      setError(undefined);
      setUser({
        username: username,
        mail: user.mail, // TODO: get mail from server
        token,
      });
      setIsStartingScreen(false);
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
          style={styles.inputBox}
          placeholder="login/email"
          placeholderTextColor={'navy'}
          value={username}
          onChangeText={text => {
            setUsername(text);
          }}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="password"
          secureTextEntry={true}
          placeholderTextColor={'navy'}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <Status error={error} loading={loading} />
        <GeneralButton
          text="Login!"
          onPressOut={onPressOut}
          disabled={loading}
        />
        <GeneralButton
          text="Cancel"
          onPressOut={() => setLoginModalVisible(false)}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

interface RegisterModalProps {
  registerModalVisible: boolean;
  setRegisterModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function RegisterModal({
  registerModalVisible,
  setRegisterModalVisible,
}: RegisterModalProps) {
  const {setIsStartingScreen} = useContext(AppContext);
  return (
    <Modal visible={registerModalVisible} animationType="slide">
      <RegisterScreen
        setIsStartingScreen={setIsStartingScreen}
        setRegisterModalVisible={setRegisterModalVisible}
      />
    </Modal>
  );
}

interface RegisterScreenProps {
  setIsStartingScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function RegisterScreen({setRegisterModalVisible}: RegisterScreenProps) {
  const {setUser, setIsStartingScreen} = useContext(AppContext);

  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function onPressOut() {
    if (!login || !email || !password || !repeatedPassword) {
      setError('Please fill in all fields');
      return;
    } else if (password !== repeatedPassword) {
      setError("Passwords don't match");
      return;
    } else if (authUtils.isValidEmail(email) === false) {
      setError('Please enter a valid email');
      return;
    }

    setError(undefined);
    setLoading(true);
    try {
      const sleepPromise =  authUtils.sleep();
      await authUtils.register(login, email, password);
      await sleepPromise;
    } catch (e) {
      setError(e as string);
      setLoading(false);
      return;
    }
    try {
      const token = await authUtils.login(login, password);
      setUser({
        username: login,
        mail: email,
        token,
      });
      setIsStartingScreen(false);
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
          placeholder="login"
          placeholderTextColor={'navy'}
          style={styles.inputBox}
          onChangeText={text => {
            setLogin(text);
          }}
        />
        <TextInput
          placeholder="email"
          placeholderTextColor={'navy'}
          style={styles.inputBox}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          placeholderTextColor={'navy'}
          style={styles.inputBox}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <TextInput
          placeholder="repeat password"
          secureTextEntry={true}
          placeholderTextColor={'navy'}
          style={styles.inputBox}
          onChangeText={text => {
            setRepeatedPassword(text);
            if (text !== password) {
              setError("Passwords don't match");
            } else {
              setError(undefined);
            }
          }}
        />
        <Status loading={loading} error={error} />
        <GeneralButton
          text="Register!"
          onPressOut={onPressOut}
          disabled={loading}
        />
        <GeneralButton
          text="Cancel"
          onPressOut={() => {
            setRegisterModalVisible(false);
          }}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

interface ForgotPasswordModalProps {
  forgotPasswordModalVisible: boolean;
  setForgotPasswordModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ForgotPasswordModal({
  forgotPasswordModalVisible,
  setForgotPasswordModalVisible,
}: ForgotPasswordModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string>('');
  const [requestSent, setRequestSent] = useState(false);

  async function onPressOut() {
    setRequestSent(false);
    if (email === '') {
      setError('Please fill in your email');
      return;
    } else if (authUtils.isValidEmail(email) === false) {
      setError('Please enter a valid email');
      return;
    }
    setError(undefined);
    setLoading(true);
    try {
      const sleepPromise = authUtils.sleep();
      await authUtils.resetPassword(email);
      await sleepPromise;
      setError(undefined);
      setRequestSent(true);
    } catch (e) {
      setError(e as string);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={forgotPasswordModalVisible} animationType="slide">
      <SafeAreaView style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="login/email"
              placeholderTextColor={'navy'}
              style={styles.inputBox}
              onChangeText={text => {
                setEmail(text);
              }}
            />
            <GeneralButton
              text="Reset password!"
              textStyle={styles.resetPasswordButtonText}
              onPressOut={onPressOut}
              disabled={loading}
            />
            <GeneralButton
              text="Cancel"
              onPressOut={() => {
                setForgotPasswordModalVisible(false);
              }}
              disabled={loading}
            />
            <Status
              loading={loading}
              error={error}
              hint={requestSent ? 'Ruff! Request sent' : undefined}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export const styles = StyleSheet.create({
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
  buttonContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerText: {
    color: 'black',
    textAlign: 'center',
  },
  overButtonHintText: {
    color: 'black',
    textAlign: 'center',
    textShadowColor: 'navy',
    textShadowRadius: 1,
    fontSize: 16,
  },
  resetPasswordButtonText: {
    fontSize: 24,
  },
  resetPasswordInformationText: {
    fontSize: 24,
    textShadowColor: 'navy',
    textShadowRadius: 1,
  },
});

export default StartingScreen;
