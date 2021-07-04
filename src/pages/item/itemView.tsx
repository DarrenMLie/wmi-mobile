import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import { Item } from 'models/item';
import ItemServiceClient from 'clients/itemService';
import { StackNavigationProp } from '@react-navigation/stack';
import { ItemStackParamList } from 'navigatorTypes';
import { RouteProp } from '@react-navigation/native';

interface ItemViewProps {
  navigation: StackNavigationProp<ItemStackParamList, 'ItemView'>;
  route: RouteProp<ItemStackParamList, 'ItemView'>;
}

interface ItemViewState {
  item: Item | null,
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightCyan,
  },
});

class ItemView extends React.Component<ItemViewProps, ItemViewState> {
  constructor(props: ItemViewProps) {
    super(props);

    this.state = {
      item: null,
    }
  }

  async componentDidMount() {
    const client = new ItemServiceClient();
    const item = await client.getItem(this.props.route.params.id);
    this.setState({ item });
  }

  render(): React.ReactNode {
    const { item } = this.state;

    return (
      <View style={styles.container}>
        <Components.NavigationBar
          icon="arrow-left"
          callback={this.props.navigation.goBack}
        />
        <Components.MainContainer>
          {item && (
            <>
              <Text>{item.name}</Text>
              <Text>{item.notes}</Text>
            </>
          )}
        </Components.MainContainer>
      </View>
    );
  }
}

export default ItemView;