import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DrawerActions } from '@react-navigation/native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FontAwesome5 } from '@expo/vector-icons';
import COLOR from 'constants/color';
import { logout } from 'reduxActions/auth/authReducer';

const styles = EStyleSheet.create({
  upperContainer: {
    backgroundColor: COLOR.darkModerateCyan,
    marginTop: '1.5rem',
    padding: '1.5rem',
    flex: 1,
    flexDirection: 'row',
  },
  appName: {
    color: COLOR.lighterCyan,
    fontWeight: 'bold',
  },
  heading: {
    flex: 1,
    color: COLOR.lighterCyan,
  },
  closeButtonContainer: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    alignItems: 'flex-end',
  },
  navigationItem: {
    flexDirection: 'row',
    backgroundColor: COLOR.lightCyan,
    padding: '1rem',
  },
  icon: {
    marginTop: '0.125rem',
    marginRight: '0.125rem',
    width: '10%',
  },
  navigationText: {
    color: COLOR.darkCyan,
  }
});

const navigationList = [
  {
    icon: 'search',
    text: 'Browse my items',
    page: 'ItemList'
  },
  {
    icon: 'plus',
    text: 'New item',
    page: ''
  },
  {
    icon: 'sync',
    text: 'Backup & Sync',
    page: ''
  },
  {
    icon: 'comments',
    text: 'Feedback',
    page: ''
  },
  { 
    icon: 'user-circle',
    text: 'Me',
    page: 'MyProfile'
  },
];

interface DrawerProps {
  dispatch: Dispatch;
  navigationProps: DrawerContentComponentProps;
}

class Drawer extends React.Component<DrawerProps> {
  logout = () => {
    this.props.dispatch(logout())
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.upperContainer}>
          <View style={styles.heading}>
            <Text style={styles.appName}>
              Where's My Item?
            </Text>
          </View>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={() => {
              this.props.navigationProps.navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
            <FontAwesome5
              color={COLOR.lighterCyan}
              name="times"
              size={PixelRatio.getFontScale() * 16}
              solid
            />
          </TouchableOpacity>
        </View>
        {navigationList.map(item => (
          <TouchableOpacity
            style={styles.navigationItem}
            onPress={() => {
              this.props.navigationProps.navigation.navigate(item.page);
            }}
          >
            <FontAwesome5
              color={COLOR.darkCyan}
              name={item.icon}
              size={PixelRatio.getFontScale() * 16}
              solid
              style={styles.icon}
            />
            <Text
              style={styles.navigationText}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={this.logout}
        >
          <FontAwesome5
            color={COLOR.darkCyan}
            name='sign-out-alt'
            size={PixelRatio.getFontScale() * 16}
            solid
            style={styles.icon}
          />
          <Text
            style={styles.navigationText}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default connect()(Drawer);