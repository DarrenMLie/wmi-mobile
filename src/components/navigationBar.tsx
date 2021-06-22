import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FontAwesome5 } from '@expo/vector-icons';
import COLOR from 'constants/color';
import StatusBar from './statusBar';

interface NavigationBarProps {
  icon: string;
  callback?: () => void;
}

const styles = EStyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1rem',
  },
  navigationTouchable: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minWidth: '10%',
  },
});

class NavigationBar extends React.Component<NavigationBarProps> {
  render(): React.ReactNode {
    return(
      <React.Fragment>
        <StatusBar />
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.props.callback}
            style={styles.navigationTouchable}
          >
            <FontAwesome5
              color={COLOR.darkCyan}
              name={this.props.icon}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
}

export default NavigationBar;
