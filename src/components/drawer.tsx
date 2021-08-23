import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { AppDispatch }  from 'reduxActions/store';
import { DrawerActions, StackActions } from '@react-navigation/native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FontAwesome5 } from '@expo/vector-icons';
import COLOR from 'constants/color';
import { signOut } from 'reduxActions/auth/actions';
import { RootState } from 'reduxActions/store';

const styles = EStyleSheet.create({
  outerContainer: {
    backgroundColor: COLOR.lightCyan,
  },
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

const onlineNavigationList = [
  {
    icon: 'search',
    text: 'Browse my items',
    page: 'ItemList'
  },
  {
    icon: 'plus',
    text: 'New item',
    page: 'CreateItemForm'
  },
  {
    icon: 'comments',
    text: 'Feedback',
    page: 'Feedback'
  },
  { 
    icon: 'user-circle',
    text: 'Me',
    page: 'MyProfile'
  },
];

const offlineNavigationList = onlineNavigationList.slice();
offlineNavigationList.splice(4, 0, {
  icon: 'sync',
  text: 'Backup & Sync',
  page: ''
});

interface DrawerProps {
  isAuthenticated: boolean;
  dispatch: AppDispatch;
  navigationProps: DrawerContentComponentProps;
}

class Drawer extends React.Component<DrawerProps> {
  logout = async () => {
    await this.props.dispatch(signOut());
  }

  render() {
    const { isAuthenticated } = this.props;
    const navigationList = isAuthenticated ? onlineNavigationList : offlineNavigationList;

    return (
      <ScrollView style={styles.outerContainer}>
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
            key={item.text}
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
          onPress={isAuthenticated ? this.logout : () => {
            this.props.navigationProps.navigation.dispatch(StackActions.popToTop);
          }}
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
            {isAuthenticated ? 'Logout' : 'Back to Options'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Drawer);