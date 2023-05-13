import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {AppContext} from './Context';
import {login} from './authUtils';

const Stack = createNativeStackNavigator();

function StartingScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({navigation}: {navigation: any}) {
  const {setIsStartingScreen} = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <LoginInput />
        <View style={styles.buttonContainer}>
          <Text style={styles.overButtonText}>Don't have an account yet?</Text>
          <Pressable
            style={styles.button}
            onPressOut={() => {
              navigation.navigate('RegisterScreen');
            }}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.overButtonText}>
            Don't remember your password?
          </Text>
          <Pressable
            style={styles.button}
            onPressOut={() => {
              navigation.navigate('ForgotPasswordScreen');
            }}>
            <Text style={[styles.buttonText, styles.resetPasswordButtonText]}>
              Reset password
            </Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.overButtonText}>
            Continue without an account?
          </Text>
          <Pressable
            style={styles.button}
            onPressOut={() => {
              setIsStartingScreen(false);
            }}>
            <Text style={styles.buttonText}>Skip</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function LoginInput() {
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
      const token = await login(username, password);
      setError(undefined);
      setUser({
        username: user.username,
        mail: user.mail,
        token,
      });
      setIsStartingScreen(false);
    } catch (e) {
      setError(e?.toString());
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.inputContainer}>
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
      <LoginStatus error={error} loading={loading} />
      <Pressable
        style={loading ? styles.buttonDisabled : styles.button}
        disabled={loading}
        onPressOut={onPressOut}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

interface LoginStatusProps {
  loading: boolean;
  error: string | undefined;
}

function LoginStatus({loading, error}: LoginStatusProps) {
  return (
    <View style={styles.statusBox}>
      {loading ? (
        <Text style={styles.statusLoadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.statusErrorText}>{error}</Text>
      ) : null}
    </View>
  );
}

function RegisterScreen() {
  const {setIsStartingScreen} = useContext(AppContext);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="login"
            placeholderTextColor={'navy'}
            style={styles.inputBox}
          />
          <TextInput
            placeholder="email"
            placeholderTextColor={'navy'}
            style={styles.inputBox}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            placeholderTextColor={'navy'}
            style={styles.inputBox}
          />
          <TextInput
            placeholder="name"
            placeholderTextColor={'navy'}
            style={styles.inputBox}
          />
          <Pressable
            style={styles.button}
            onPressOut={() => {
              setIsStartingScreen(false);
            }}>
            <Text style={styles.buttonText}>Register!</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ForgotPasswordScreen() {
  const [requestSent, setRequestSent] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {requestSent === false ? (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="login/email"
              placeholderTextColor={'navy'}
              style={styles.inputBox}
            />
            <Pressable
              style={styles.button}
              onPressOut={() => {
                setRequestSent(true);
              }}>
              <Text style={[styles.buttonText, styles.resetPasswordButtonText]}>
                Reset password
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.buttonContainerText,
                styles.resetPasswordInformationText,
              ]}>
              Request sent!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {},
  scrollContent: {
    justifyContent: 'center',
    flexGrow: 1,
  },
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
  buttonContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerText: {
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'royalblue',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    height: 50,
    width: 200,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '215582',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    height: 50,
    width: 200,
    alignItems: 'center',
  },
  overButtonText: {
    color: 'black',
    textAlign: 'center',
    textShadowColor: 'navy',
    textShadowRadius: 1,
    fontSize: 16,
  },
  buttonText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
  },
  statusBox: {
    height: 20,
    width: 200,
    alignItems: 'center',
  },
  statusErrorText: {
    color: 'red',
    textAlign: 'center',
  },
  statusLoadingText: {
    color: 'grey',
    textAlign: 'center',
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
