import React from 'react';
import { View, Text, StyleProp } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import COLOR from 'constants/color';

const styles = EStyleSheet.create({
  container: {
    marginBottom: '1rem',
  },
  text: {
    textAlign: 'center',
    fontSize: '2rem',
    color: COLOR.darkCyan,
    fontWeight: 'bold',
  },
});

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps): JSX.Element => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {props.title}
    </Text>
  </View>
);

export default Header;