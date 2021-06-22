import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import COLOR from 'constants/color';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: COLOR.lightCyan,
    paddingBottom: '1rem',
    paddingLeft: '2.125rem',
    paddingRight: '1.75rem',
  },
});

class Drawer extends React.Component {
  render(): React.ReactNode {
    return (
      <ScrollView />
    );
  }
}

export default Drawer;