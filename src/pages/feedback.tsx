import React from 'react';
import { ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import { DrawerStackParamList } from 'navigatorTypes';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Linking } from 'react-native';

interface FeedbackProps {
  navigation: DrawerNavigationProp<DrawerStackParamList, 'Feedback'>,
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightCyan,
  },
  text: {
    marginBottom: '1rem', 
    flexDirection: 'column',
  },
  link: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});

const Feedback = (props: FeedbackProps): JSX.Element => {
    return (
      <ScrollView style={styles.container}>
        <Components.NavigationBar
          icon="bars"
          callback={props.navigation.toggleDrawer}
          title="Feedback"
        />
        <Components.MainContainer>
          <Components.Text style={styles.text}>
            Where's My Item? is a social network mobile app created to help people develop a healthier lifestyle in their shopping choices and space management by keeping track of what they possess and where the items are, how much they spent on new items, and comparison of purchase vs discard every month.  
          </Components.Text>
          <Components.Text style={styles.text}>
            If you or any of your loved ones are struggling from hoarding behaviours, you can seek help by joining these communities:{'\n'}
            <Components.Text style={styles.link} onPress={() => Linking.openURL('https://www.reddit.com/r/ChildofHoarder/')}>r/ChildofHoarder{'\n'}</Components.Text>
            <Components.Text style={styles.link} onPress={() => Linking.openURL('https://www.reddit.com/r/hoarding/')}>r/hoarding</Components.Text>
          </Components.Text>
          <Components.Text style={styles.text}>
            Special thanks to:{'\n'}
            roumanite{'\n'}
            Shadowz
          </Components.Text>
          <Components.Text style={styles.text}>
            Please send any feedback to <Components.Text style={styles.link} onPress={() => Linking.openURL('mailto:madyagra@gmail.com')}>madyagra@gmail.com</Components.Text>
          </Components.Text>
        </Components.MainContainer>
      </ScrollView>
    );
}

export default Feedback;