import React from 'react';
import { ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import { LandingStackParamList } from 'navigatorTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import COLOR from 'constants/color';

type NavigationProp = StackNavigationProp<LandingStackParamList, 'Login'>;
interface LoginProps {
  navigation: NavigationProp;
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '1rem',
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

class Login extends React.Component<LoginProps> {
  constructor(props: LoginProps) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <ScrollView style={styles.container}>
        <Components.NavigationBar
          callback={this.props.navigation.goBack}
        />
        <Components.MainContainer>
          <Components.Header
            title='Welcome back!'
          />
          <Components.Textbox
            fieldName="Email"
            isRequired
            placeholder="Email"
          />
          <Components.Textbox
            fieldName="Password"
            isRequired
            placeholder="Password"
          />
          <Components.Button
            style={styles.loginButton}
            onPress={() => {}}
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