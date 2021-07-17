import React from 'react';
import { RootState } from 'reduxActions/store';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Options from 'pages/options';
import Login from 'pages/login';
import Register from 'pages/register';
import List from 'pages/item/itemList';
import ItemView from 'pages/item/itemView';
import CreateItemForm from 'pages/item/createItemForm';
import EditItemForm from 'pages/item/editItemForm';
import MyProfile from 'pages/profile/myProfile';
import EditProfileForm from 'pages/profile/editProfileForm';
import { Dispatch }  from 'redux';
import Components from 'components';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { LandingStackParamList, DrawerStackParamList, ItemStackParamList, UserStackParamList } from 'navigatorTypes';

interface AppProps {
  dispatch: Dispatch;
  isAuthenticated: boolean;
}

const LandingStack = createStackNavigator<LandingStackParamList>();
const DrawerStack = createDrawerNavigator<DrawerStackParamList>();
const ItemStack = createStackNavigator<ItemStackParamList>();
const UserStack = createStackNavigator<UserStackParamList>();

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

class App extends React.Component<AppProps> {
  renderDrawer(props: DrawerContentComponentProps): React.ReactNode {
    return (
      <Components.Drawer
        navigationProps={props}
      />
    );
  }

  renderItemManager = () => {
    return (
      <ItemStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <ItemStack.Screen name="ItemList" component={List} />
        <ItemStack.Screen name="ItemView" component={ItemView} />
        <ItemStack.Screen name="CreateItemForm" component={CreateItemForm} />
        <ItemStack.Screen name="EditItemForm" component={EditItemForm} />
      </ItemStack.Navigator>
    );
  }

  renderUserStack = () => {
    return (
      <UserStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <UserStack.Screen name="MyProfile" component={MyProfile} />
        <UserStack.Screen name="EditProfileForm" component={EditProfileForm} />
      </UserStack.Navigator>
    )
  }

  render(): React.ReactNode {
    return (
      <View style={styles.mainContainer}>
        <NavigationContainer>
          {this.props.isAuthenticated ? (
            <DrawerStack.Navigator
              drawerContent={this.renderDrawer}
              initialRouteName="ItemList"
            >
              <DrawerStack.Screen name="ItemList" component={this.renderItemManager} />
              <DrawerStack.Screen name="MyProfile" component={this.renderUserStack} />
            </DrawerStack.Navigator>
          ) : (
            <LandingStack.Navigator
              initialRouteName="Options"
              screenOptions={{
                headerShown: false,
              }}
            >
              <LandingStack.Screen name="Options" component={Options} />
              <LandingStack.Screen name="Login" component={Login} />
              <LandingStack.Screen name="Register" component={Register} />
            </LandingStack.Navigator>
          )}
        </NavigationContainer>
      </View>
    )
  }
}

function mapStateToProps(state: RootState) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(App);
