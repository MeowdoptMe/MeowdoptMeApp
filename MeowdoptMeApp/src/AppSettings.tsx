import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import {GeneralButton} from './components/GeneralButton';

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
          placeholder="old password"
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
          text="Cancel"
          onPressOut={() => setChangePasswordModalVisible(false)}
        />

        {/* </View> */}
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

export {ChangePasswordModal};
