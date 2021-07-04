import React from 'react';
import { FlatList, View, Text, ListRenderItemInfo, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import { Item } from 'models/item';
import ItemServiceClient from 'clients/itemService';
import { FontAwesome } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerStackParamList, ItemStackParamList } from 'navigatorTypes';
import { CompositeNavigationProp } from '@react-navigation/native';

interface ItemListProps {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<DrawerStackParamList, 'ItemList'>,
    StackNavigationProp<ItemStackParamList, 'ItemList'>
  >;
}

interface ItemListState {
  items: Item[],
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightCyan,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: '1rem'
  },
  name: {
    color: COLOR.darkCyan,
    fontWeight: '600',
    fontSize: '1rem',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  list: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  separator: {
    height: '1rem',
  },
  heart: {
    alignSelf: 'center',
    marginLeft: 'auto',
  }
});

class ItemList extends React.Component<ItemListProps, ItemListState> {
  constructor(props: ItemListProps) {
    super(props);

    this.state = {
      items: [],
    }
  }

  async componentDidMount() {
    const client = new ItemServiceClient();
    const metaItems = await client.getItemList();
    this.setState({ items: metaItems.results });
  }

  renderItem = ({ item }: ListRenderItemInfo<Item>): React.ReactElement => {
    return (
      <TouchableOpacity
        onPress={() => { this.props.navigation.navigate('ItemView', { id: item.id }); }}
      >
        <View style={styles.itemContainer}>
          <Image
            style={styles.thumbnail}
            source={{ uri: 'https://place-hold.it/60x60' }}
          />
          <View>
          <Text style={styles.name}>
            {item.name}
          </Text>
          <Text style={{ color: COLOR.darkCyan }}>
            {item.notes}
          </Text>
          </View>
          <FontAwesome
            color={COLOR.darkCyan}
            name={item.isFavorite ? 'heart' : 'heart-o'}
            size={20}
            style={styles.heart}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Components.NavigationBar
          icon="bars"
          callback={this.props.navigation.toggleDrawer}
        />
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.items}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default ItemList;