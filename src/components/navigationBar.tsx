import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FontAwesome5 } from '@expo/vector-icons';
import COLOR from 'constants/color';
import StatusBar from './statusBar';

interface NavigationBarProps {
  icon: string;
  callback?: () => void;
  title?: string;
  rightPanel?: React.ReactNode;
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1rem',
    backgroundColor: COLOR.darkModerateCyan,
  },
  navigationTouchable: {
    padding: '0.375rem',
    zIndex: 10,
  },
  title: {
    alignSelf: 'center',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: COLOR.lighterCyan,
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  rightPanel: {
    flexDirection: 'row',
  }
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
              color={COLOR.lighterCyan}
              name={this.props.icon}
              size={20}
            />
          </TouchableOpacity>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
          <View style={styles.rightPanel}>
            {this.props.rightPanel}
          </View>
        </View>
      </React.Fragment>
    );
  }
}

export default NavigationBar;
