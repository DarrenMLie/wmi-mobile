import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LandingStackParamList } from 'navigatorTypes';
import OptionsPage from 'pages/optionsPage';
import EStyleSheet from 'react-native-extended-stylesheet';
import { registerRootComponent } from 'expo';
import React from 'react';
import { View } from 'react-native';

EStyleSheet.build();

const LandingStack = createStackNavigator<LandingStackParamList>();

interface ExpoProps {
  exp: {
    notification?: any;
    errorRecovery?: any;
    manifestString?: string;
    [key: string]: any;
  };
  shell?: boolean;
  shellManifestUrl?: string;
  [key: string]: any;
}

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default class WhereIsMyItem extends React.Component<ExpoProps> {
  render(): React.ReactNode {
    return (
      <View style={styles.mainContainer}>
        <NavigationContainer>
          <LandingStack.Navigator
            initialRouteName="Options"
            screenOptions={{
              headerShown: false,
            }}
          >
            <LandingStack.Screen name="Options" component={OptionsPage} />
          </LandingStack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

registerRootComponent(WhereIsMyItem);
