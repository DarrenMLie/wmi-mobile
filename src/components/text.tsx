import React from 'react';
import { Text, TextProps } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import COLOR from 'constants/color';

const styles = EStyleSheet.create({
  text: {
    color: COLOR.darkCyan,
  }
});

interface Props extends TextProps {
  children: React.ReactNode,
}

const CommonText = (props: Props): JSX.Element => (
  <Text
    {...props}
    style={[styles.text, props.style]}
  >
    {props.children}
  </Text>
);

export default CommonText;