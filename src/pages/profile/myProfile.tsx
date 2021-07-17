import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import { Profile } from 'models/user';
import UserClient from 'clients/user';
import { FontAwesome5 } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerStackParamList, UserStackParamList } from 'navigatorTypes';
import { CompositeNavigationProp } from '@react-navigation/native';

interface MyProfileProps {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<DrawerStackParamList, 'ItemList'>,
    StackNavigationProp<UserStackParamList, 'MyProfile'>
  >;
}

interface MyProfileState {
  profile: Profile | null,
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightCyan,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  fullName: {
    color: COLOR.darkCyan,
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  username: {
    color: COLOR.darkCyan,
    fontStyle: 'italic',
  },
  navigationTouchable: {
    padding: '0.375rem',
  },
});

class MyProfile extends React.Component<MyProfileProps, MyProfileState> {
  constructor(props: MyProfileProps) {
    super(props);

    this.state = {
      profile: null,
    }
  }

  async componentDidMount() {
    const client = new UserClient();
    const profile = await client.getMyProfile();
    this.setState({ profile: profile });
  }

  render(): React.ReactNode {
    const { profile } = this.state;

    return (
      <View style={styles.container}>
        <Components.NavigationBar
          icon="bars"
          callback={this.props.navigation.toggleDrawer}
          rightPanel={(
            <>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.navigationTouchable}
              onPress={() => { this.props.navigation.navigate('EditProfileForm') }}
            >
              <FontAwesome5
                color={COLOR.darkCyan}
                name="edit"
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.navigationTouchable}
            >
              <FontAwesome5
                color={COLOR.darkCyan}
                name="bell"
                size={20}
              />
            </TouchableOpacity>
            </>
          )}
        />
        {profile && (
          <View style={styles.content}>
            <Text style={styles.fullName}>{profile.firstName} {profile.lastName}</Text>
            <Text style={styles.username}>@{profile.username}</Text>
            <Text>{profile.bio}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default MyProfile;