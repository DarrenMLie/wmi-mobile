import React from 'react';
import { ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import { LandingStackParamList } from 'navigatorTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import COLOR from 'constants/color';
import AuthClient from 'clients/auth';

type NavigationProp = StackNavigationProp<LandingStackParamList, 'Register'>;

interface RegisterProps {
  navigation: NavigationProp;
}

interface RegisterState {
  form: {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    retypePassword: string;
  },
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightCyan,
  },
  registerButton: {
    height: '3.25rem',
    width: '50%',
    alignSelf: 'center',
    margin: '1rem',
  },
  registerText: {
    fontSize: '1rem',
  },
});

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);

    this.state = {
      form: {
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        retypePassword: ""
      }
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

  register = async (): Promise<void> => {
    try {
        const client = new AuthClient();
        const response = await client.signUp(this.state.form);
        this.props.navigation.goBack();
    } catch(error) {
        console.log(error);
    }   
  }

  render(): React.ReactNode {
    return (
      <ScrollView style={styles.container}>
        <Components.NavigationBar
          icon="arrow-left"
          callback={this.props.navigation.goBack}
        />
        <Components.MainContainer>
          <Components.Header
            title='Register'
          />
          <Components.Textbox
            fieldName="Email"
            isRequired
            onChangeText={(value) => { this.onChange('email', value); }}
            placeholder="Email"
          />
          <Components.Textbox
            fieldName="First Name"
            isRequired
            onChangeText={(value) => { this.onChange('firstName', value); }}
            placeholder="First Name"
          />
          <Components.Textbox
            fieldName="Last Name"
            isRequired
            onChangeText={(value) => { this.onChange('lastName', value); }}
            placeholder="Last Name"
          />
          <Components.Textbox
            fieldName="Username"
            isRequired
            onChangeText={(value) => { this.onChange('username', value); }}
            placeholder="Username"
          />
          <Components.Textbox
            fieldName="Password"
            isRequired
            onChangeText={(value) => { this.onChange('password', value); }}
            placeholder="Password"
          />
          <Components.Textbox
            fieldName="Retype Password"
            isRequired
            onChangeText={(value) => { this.onChange('retypePassword', value); }}
            placeholder="Retype Password"
          />
          <Components.Button
            style={styles.registerButton}
            onPress={this.register}
            textStyle={styles.registerText}
          >
            Register
          </Components.Button>
          <Components.Text onPress={() => { this.props.navigation.navigate('Login')}}>
            Already have an account? Login here.
          </Components.Text>
        </Components.MainContainer>
        
      </ScrollView>
    );
  }
}

export default Register;