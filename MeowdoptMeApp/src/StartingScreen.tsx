import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {useContext, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {ScreenContext} from './Context';

const Stack = createNativeStackNavigator();

function StartingScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
    <View style={styles.sectionContainer}>
      <View style={styles.loginContainer}>
        <LoginInput setIsStartingScreen={setIsStartingScreen} />
        <View style={styles.multibuttonContainer}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonContainerText}>
              Don't have an account yet?
            </Text>
            <View style={styles.button}>
              <Pressable
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <Text style={styles.buttonText}>Register</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonContainerText}>
              Don't remember your password?
            </Text>
            <View style={styles.button}>
              <Pressable
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}>
                <Text style={[styles.buttonText, styles.forgotPasswordText]}>
                  Reset password
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonContainerText}>
              Continue without an account?
            </Text>
            <View style={styles.button}>
              <Pressable
                onPress={() => {
                  setIsStartingScreen!(false); // TODO use assert here
                }}>
                <Text style={styles.buttonText}>Skip</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

interface LoginInputProps {
  setIsStartingScreen: React.Dispatch<React.SetStateAction<boolean>> | null;
}

function LoginInput({setIsStartingScreen}: LoginInputProps) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputBoxContainer}>
        <TextInput
          placeholder="login/email"
          placeholderTextColor={'navy'}
          style={styles.inputBox}
        />
      </View>
      <View style={styles.inputBoxContainer}>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          placeholderTextColor={'navy'}
          style={styles.inputBox}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              setIsStartingScreen!(false); // TODO use assert here
            }}>
            <Text style={styles.buttonText}>Login!</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function Register() {
  const setIsStartingScreen = useContext(ScreenContext);
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.inputBoxContainer}>
          <TextInput
            placeholder="login"
            placeholderTextColor={'navy'}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <TextInput
            placeholder="email"
            placeholderTextColor={'navy'}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            placeholderTextColor={'navy'}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <TextInput
            placeholder="name"
            placeholderTextColor={'navy'}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              setIsStartingScreen!(false); // TODO use assert here
            }}>
            <Text style={styles.buttonText}>Register!</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function ForgotPassword() {
  const [requestNotSent, setRequestNotSent] = useState(true);
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.inputBoxContainer}>
          <TextInput
            placeholder="login/email"
            placeholderTextColor={'navy'}
            style={styles.inputBox}
          />
        </View>
        {requestNotSent ? (
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                setRequestNotSent(false);
              }}>
              <Text style={[styles.buttonText, styles.forgotPasswordText]}>
                Reset password
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Text
              style={[styles.buttonContainerText, styles.resetPasswordText]}>
              Request sent!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  loginContainer: {
    maxHeight: '60%',
    height: '100%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBoxContainer: {
    flex: 1,
    margin: 5,
    maxHeight: 50,
    width: 200,
  },
  inputBox: {
    flex: 1,
    color: 'black',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
  },
  multibuttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10,
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
    maxHeight: 40,
    minWidth: 160,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
  },
  forgotPasswordText: {
    fontSize: 20,
  },
  resetPasswordText: {
    fontSize: 20,
  },
});

export default StartingScreen;
