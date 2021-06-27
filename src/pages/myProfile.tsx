import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import { Profile } from 'models/user';
import UserClient from 'clients/user';
import { FontAwesome } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerStackParamList } from 'navigatorTypes';

interface MyProfileProps {
  navigation: DrawerNavigationProp<DrawerStackParamList, 'MyProfile'>;
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
  }
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