import React from 'react';
import {
  TextInput, TextInputProps, Text, View, StyleProp,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import COLOR from 'constants/color';

const styles = EStyleSheet.create({
  shadowBox: {
    backgroundColor: COLOR.white,
    marginLeft: 1,
    marginRight: 1,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: '3.25rem',
    borderWidth: 1.5,
    borderColor: COLOR.darkCyan,
  },
  textInput: {
    flex: 1,
    padding: '1rem',
    height: '3.25rem',
  },
  container: {
    marginTop: '0.25rem',
    marginBottom: '0.5rem',
    width: '100%',
  },
  fieldName: {
    fontWeight: 'bold',
    color: COLOR.darkCyan,
    fontSize: '1rem',
  },
  requiredMark: {
    color: COLOR.darkCyan,
  },
});

interface fieldInputProps {
  fieldName?: string;
  isRequired?: boolean;
  style?: StyleProp<View>;
}

type TextboxProps = TextInputProps & fieldInputProps;

const Textbox = (props: TextboxProps): JSX.Element => (
  <View style={[styles.container, props.style]}>
    {
      props.fieldName ? (
        <Text style={styles.fieldName}>
          {props.fieldName}
          {props.isRequired && (
            <Text style={styles.requiredMark}>
              *
            </Text>
          )}
        </Text>
      ) : false
    }
    <View
      style={[
        styles.textInputContainer,
        styles.shadowBox,
      ]}>
      <TextInput
        {...props}
        style={styles.textInput}
      />
    </View>
  </View>
);

export default Textbox;