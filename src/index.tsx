import EStyleSheet from 'react-native-extended-stylesheet';
import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { getStore, persistor } from 'reduxActions/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app';

EStyleSheet.build();

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

const store = getStore();

class WhereIsMyItem extends React.Component<ExpoProps> {
  render(): React.ReactNode {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor()}>
        <App />
      </PersistGate>
      </Provider>
    );
  }
}

registerRootComponent(WhereIsMyItem);
