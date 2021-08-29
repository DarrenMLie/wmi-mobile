import * as React from 'react';
import { ScrollView } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerStackParamList } from 'navigatorTypes';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';

interface BackupAndSyncProps {
  navigation: DrawerNavigationProp<DrawerStackParamList, 'BackupAndSync'>,
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightCyan,
  },
});

const BackupAndSyncPage = (props: BackupAndSyncProps): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <Components.NavigationBar
        icon="bars"
        callback={props.navigation.toggleDrawer}
        title="Backup and Sync"
      />
      <Components.MainContainer>
        <Components.Text>
          This page is coming soon.
        </Components.Text>
      </Components.MainContainer>
    </ScrollView>
  );
}

export default BackupAndSyncPage;
