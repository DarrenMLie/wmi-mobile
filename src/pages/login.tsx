import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import { LandingStackParamList } from 'navigatorTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import COLOR from 'constants/color';
import { FontAwesome5 } from '@expo/vector-icons';

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
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Components.MainContainer>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.props.navigation.goBack}
          >
            <FontAwesome5
              color={COLOR.black}
              name={'arrow-left'}
              size={20}
            />
          </TouchableOpacity>
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