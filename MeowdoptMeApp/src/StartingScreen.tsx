import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
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
import {ScreenContext} from './Context';

const Stack = createNativeStackNavigator();

function StartingScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Login({navigation}: {navigation: any}) {
  const setIsStartingScreen = useContext(ScreenContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <LoginInput setIsStartingScreen={setIsStartingScreen} />
        <View style={styles.buttonContainer}>
          <Text style={styles.overButtonText}>Don't have an account yet?</Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('Register');
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
            onPress={() => {
              navigation.navigate('ForgotPassword');
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
            onPress={() => {
              setIsStartingScreen!(false); // TODO use assert here
            }}>
            <Text style={styles.buttonText}>Skip</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface LoginInputProps {
  setIsStartingScreen: React.Dispatch<React.SetStateAction<boolean>> | null;
}

function LoginInput({setIsStartingScreen}: LoginInputProps) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputBox}
        placeholder="login/email"
        placeholderTextColor={'navy'}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="password"
        secureTextEntry={true}
        placeholderTextColor={'navy'}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          setIsStartingScreen!(false); // TODO use assert here
        }}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

function Register() {
  const setIsStartingScreen = useContext(ScreenContext);
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
            onPress={() => {
              setIsStartingScreen!(false); // TODO use assert here
            }}>
            <Text style={styles.buttonText}>Register!</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ForgotPassword() {
  const [requestNotSent, setRequestNotSent] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {requestNotSent ? (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="login/email"
              placeholderTextColor={'navy'}
              style={styles.inputBox}
            />
            <Pressable
              style={styles.button}
              onPress={() => {
                setRequestNotSent(false);
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
