import React from 'react';
import { View, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Constants from 'expo-constants';
import COLOR from 'constants/color';

const styles = EStyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: COLOR.white,
  },
});

interface StatusBarProps {
  color?: string;
}

const CustomStatusBar = (props: StatusBarProps): JSX.Element => (
  <View style={[styles.statusBar, { backgroundColor: props.color }]}>
    <StatusBar translucent barStyle="default" />
  </View>
);

export default CustomStatusBar;