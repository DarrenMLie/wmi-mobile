import React from 'react';
import { View, Modal, GestureResponderEvent } from 'react-native';
import EStylesheet from 'react-native-extended-stylesheet';
import COLOR from 'constants/color';
import Button from './button';

const styles = EStylesheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    backgroundColor: COLOR.lightCyan,
    padding: '1rem',
    width: '90%',
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  button: {
    width: '30%',
    height: '2.5rem',
  },
  buttonText: {
    fontSize: '1rem',
  },
  content: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: COLOR.darkCyan,
  },
});

interface CenterModalProps {
  children: React.ReactNode;
  rightButtonOnClick?: (event: GestureResponderEvent) => void;
  rightButtonColor?: string;
  rightButtonText?: string;
  visible: boolean;
}

const CenterModal = (props: CenterModalProps): JSX.Element => (
  <Modal
    animationType="fade"
    transparent
    visible={props.visible}
  >
    <View style={[styles.container, styles.modalBackground]}>
      <View style={styles.modalView}>
        {props.children}
        <View style={styles.buttonContainer}>
          {props.rightButtonOnClick &&
            <Button
              onPress={props.rightButtonOnClick}
              style={styles.button}
              textStyle={styles.buttonText}
            >
              {props.rightButtonText}
            </Button>
          }
        </View>
      </View>
    </View>
  </Modal>
);

export default CenterModal;