import React from 'react';
import { ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import { LandingStackParamList } from 'navigatorTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import COLOR from 'constants/color';
import AuthClient from 'clients/auth';

type NavigationProp = StackNavigationProp<LandingStackParamList, 'Login'>;

interface LoginProps {
  navigation: NavigationProp;
}

interface LoginState {
  form: {
    identifier: string;
    password: string;
  },
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightCyan,
  },
  loginButton: {
    height: '3.25rem',
    width: '50%',
    alignSelf: 'center',
    margin: '1rem',
  },
  loginText: {
    fontSize: '1rem',
  },
});

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      form: {
        identifier: '',
        password: ''
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

  login = async (): Promise<void> => {
    const client = new AuthClient();
    const response = await client.signIn(this.state.form);
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
            title='Welcome back!'
          />
          <Components.Textbox
            fieldName="Email/Username"
            isRequired
            onChangeText={(value) => { this.onChange('identifier', value); }}
            placeholder="Email/Username"
          />
          <Components.Textbox
            fieldName="Password"
            isRequired
            onChangeText={(value) => { this.onChange('password', value); }}
            placeholder="Password"
          />
          <Components.Button
            style={styles.loginButton}
            onPress={this.login}
            textStyle={styles.loginText}
          >
            Login
          </Components.Button>
        </Components.MainContainer>
      </ScrollView>
    );
  }
}

export default Login;