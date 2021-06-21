import React from 'react';
import { FlatList, View, Text, ListRenderItemInfo, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import { Item } from 'models/item';
import ItemServiceClient from 'clients/itemService';
import { FontAwesome } from '@expo/vector-icons';

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

class ItemList extends React.Component<{}, ItemListState> {
  constructor(props: {}) {
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
        {item.isFavorite ? (
          <FontAwesome
            color={COLOR.darkCyan}
            name='heart'
            size={20}
            style={styles.heart}
          />
        ) : (
          <FontAwesome
            color={COLOR.darkCyan}
            name='heart-o'
            size={20}
            style={styles.heart}
          />
        )}
      </View>
    );
  }

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Components.StatusBar />
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