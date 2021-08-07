import React from 'react';
import { ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import { LandingStackParamList } from 'navigatorTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import COLOR from 'constants/color';
import { signIn } from 'reduxActions/auth/authReducer';
import { AppDispatch }  from 'reduxActions/store';
import { connect } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

type NavigationProp = StackNavigationProp<LandingStackParamList, 'Login'>;

interface LoginProps {
  dispatch: AppDispatch;
  navigation: NavigationProp;
}

interface LoginState {
  error: string;
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
      error: '',
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
    try {
      unwrapResult(await this.props.dispatch(signIn(this.state.form)));
    } catch(e) {
      this.setState({ error: e.message });
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
          <Components.Text onPress={() => {this.props.navigation.navigate('Register')}}>
            Don't have an account? Register here.
          </Components.Text>
          <Components.Text>
            {this.state.error}
          </Components.Text>
        </Components.MainContainer>
      </ScrollView>
    );
  }
}

export default connect()(Login);