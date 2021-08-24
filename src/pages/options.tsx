import * as React from 'react';
import { View, Text, ScrollView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LandingStackParamList } from 'navigatorTypes';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import { FontAwesome5 } from '@expo/vector-icons';

type NavigationProp = StackNavigationProp<LandingStackParamList, 'Options'>;

interface LandingProps {
  navigation: NavigationProp;
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: COLOR.lightCyan,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginRight: '0.5rem',
    width: '70%'
  },
  baseText: {
    margin: '1rem',
    fontWeight: '700',
    fontSize: '1rem',
    color: COLOR.darkCyan,
  },
  buttonContainer: {
    marginBottom: '1rem',
    flexDirection: 'row', 
    alignItems: 'center',
  },
  infoIcon: {
    backgroundColor: COLOR.darkCyan,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLOR.darkModerateCyan,
  },
  infoText: {
    fontWeight: 'bold',
    marginBottom: '1rem',
  }
});

const renderInfoModal = (modalType: number, callback: () => void) => {
  return (
    <Components.Modal
      rightButtonOnClick={callback}
      rightButtonText='OK'
      visible={modalType != 0}
    >
      <View>
        {modalType == 1 ? (
          <>
            <Components.Text style={styles.infoText}>
              Online version lets you connect with friends to keep track of the items you borrow or lend.
              You do not need to worry about backing up your data. All you need is an email and password
              to store your data on the cloud. 
            </Components.Text>
            <Components.Text style={styles.infoText}>
              The data in online version is NOT mixed together with the offline version.
            </Components.Text>
          </>
        ) : (
          <>
            <Components.Text style={styles.infoText}>
              Offline version lets you keep track of your items locally without Internet connection.
              Make sure to backup and sync your data before you uninstall the application or clear the cache.
            </Components.Text>
            <Components.Text style={styles.infoText}>
              The data in offline version is NOT mixed together with the online version, i.e. the offline data is not meant
              to be synced with the online data once you are logged in to your account/when you are reconnected to the Internet.
            </Components.Text>
          </>
        )}
      </View>
    </Components.Modal>
  )
}

const LandingOptionsPage = (props: LandingProps): JSX.Element => {
  const [modalType, setModalType] = React.useState(0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.baseText}>
        Please select a version:
      </Text>
      <View style={styles.buttonContainer}>
        <Components.Button
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Login');
          }}
        >
          Online
        </Components.Button>
        <TouchableOpacity 
          style={styles.infoIcon}
          onPress={() => { setModalType(1); }}
        >
        <FontAwesome5
          color={COLOR.lighterCyan}
          name="info-circle"
          size={25}
        />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Components.Button style={styles.button} onPress={() => {
          props.navigation.navigate('MainContent');
        }}>
          Offline
        </Components.Button>
        <TouchableOpacity 
          style={styles.infoIcon}
          onPress={() => { setModalType(2); }}
        >
        <FontAwesome5
          color={COLOR.lighterCyan}
          name="info-circle"
          size={25}
        />
        </TouchableOpacity>
      </View>
      {renderInfoModal(modalType, () => { setModalType(0); })}
    </ScrollView>
  );
}

export default LandingOptionsPage;
