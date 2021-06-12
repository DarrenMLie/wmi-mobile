import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import COLOR from 'constants/color';

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLOR.lighterCyan,
    borderRadius: 100,
    height: '4.25rem',
    display: 'flex',
    width: '100%',
    borderWidth: 3,
    borderColor: COLOR.darkModerateCyan,
  },
  buttonContainer: {
    flex: 1,
  },
  text: {
    color: COLOR.darkCyan,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '1.5rem',
  },
});

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: StyleProp<TouchableOpacity>;
}

const Button = (props: ButtonProps): JSX.Element => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[
      styles.container,
      props.style,
    ]}
  >
    <View style={styles.buttonContainer}>
      <Text style={styles.text}>
        {props.children}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Button;