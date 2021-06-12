import React from 'react';
import { Text, ScrollView, Platform, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LandingStackParamList } from 'navigatorTypes';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';

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
    marginBottom: '1rem',
    width: '70%'
  },
  baseText: {
    margin: '1rem',
    fontWeight: '700',
    fontSize: '1rem',
    color: COLOR.darkCyan,
  },
})

const LandingOptionsPage = (props: LandingProps): JSX.Element => (
  <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <Text style={styles.baseText}>Please select a version:</Text>
    <Components.Button style={styles.button} onPress={() => {}}>Online</Components.Button>
    <Components.Button style={styles.button} onPress={() => {}}>Offline</Components.Button>
  </ScrollView>
);

export default LandingOptionsPage;
