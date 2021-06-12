import React from 'react';
import { View, StyleProp } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingTop: '1rem',
    display: 'flex',
    flex: 1,
    height: '100%',
  },
});

interface MainContainerProps {
  children: React.ReactNode,
  style?: StyleProp<View>,
}

const MainContainer = (props: MainContainerProps): JSX.Element => (
  <View style={[styles.container, props.style]}>
    {props.children}
  </View>
);

export default MainContainer;