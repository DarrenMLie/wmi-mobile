import React from 'react';
import { ScrollView, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import UserClient from 'clients/user';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackParamList } from 'navigatorTypes';

interface EditProfileProps {
  navigation: StackNavigationProp<UserStackParamList, 'EditProfileForm'>;
}

interface EditProfileState {
  form: {
    bio: string;
    firstName: string;
    lastName: string;
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightCyan,
  },
  thumbnail: {
    alignSelf: 'center',
    marginBottom: '1rem',
    width: 150,
    height: 150,
  },
  button: {
    height: '3.25rem',
    width: '50%',
    alignSelf: 'center',
    margin: '1rem',
  },
  buttonText: {
    fontSize: '1rem',
  },
  navigationTouchable: {
    padding: '0.375rem',
  },
});

class EditProfileForm extends React.Component<EditProfileProps, EditProfileState> {
  constructor(props: EditProfileProps) {
    super(props);

    this.state = {
      form: {
        bio: '',
        firstName: '',
        lastName: '',
      }
    }
  }

  async componentDidMount() {
    const client = new UserClient();
    const profile = await client.getMyProfile();
    this.setState({ 
      form: {
        bio: profile.bio,
        firstName: profile.firstName,
        lastName: profile.lastName,
      },
    });
  }

  save = async () => {
    try {
      const client = new UserClient();
      await client.updateMyProfile(this.state.form);
      this.props.navigation.goBack();
    } catch(e) {
      console.log(e);
    }
  }

  onChange = (field: string, value: string): void => {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [field]: value,
      },
    }));
  }

  render(): React.ReactNode {
    const { form } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Components.NavigationBar
          icon="times"
          callback={this.props.navigation.goBack}
        />
        <Components.MainContainer>
          <Image
            style={styles.thumbnail}
            source={{ uri: 'https://place-hold.it/150x150' }}
          />
          <Components.Textbox
            fieldName="First Name"
            isRequired
            onChangeText={(value) => { this.onChange('firstName', value); }}
            value={form.firstName}
          />
          <Components.Textbox
            fieldName="Last Name"
            onChangeText={(value) => { this.onChange('lastName', value); }}
            placeholder="Last Name"
            value={form.lastName}
          />
          <Components.Button
            style={styles.button}
            onPress={this.save}
            textStyle={styles.buttonText}
          >
            Save
          </Components.Button>
        </Components.MainContainer>
      </ScrollView>
    );
  }
}

export default EditProfileForm;