import React from 'react';
import { FlatList, View, Text, ListRenderItemInfo, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import { Item } from 'models/item';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerStackParamList, ItemStackParamList } from 'navigatorTypes';
import { CompositeNavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { RootState } from 'reduxActions/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { getItems, toggleOfflineIsFavorite } from 'reduxActions/item/itemReducer';
import { AppDispatch } from 'reduxActions/store';

interface ItemListProps {
  dispatch: AppDispatch;
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<DrawerStackParamList, 'ItemList'>,
    StackNavigationProp<ItemStackParamList, 'ItemList'>
  >;
  items: Item[];
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
    flexGrow: 1,
  },
  separator: {
    height: '1rem',
  },
  heart: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: '1rem',
  },
  itemInfo: {
    flex: 1,
    marginRight: '1rem',
  },
  navigationTouchable: {
    padding: '0.375rem',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class ItemList extends React.Component<ItemListProps, {}> {
  async componentDidMount() {
    try {
      unwrapResult(await this.props.dispatch(getItems()));
    } catch(e) {
      this.setState({ error: e.message });
    }
  }

  toggleIsFavorite = (id: string, isFavorite: boolean) => {
    this.props.dispatch(toggleOfflineIsFavorite({ id, isFavorite }));
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
          <View style={styles.itemInfo}>
            <Components.Text
              style={styles.name}
            >
              {item.name}
            </Components.Text>
            <Components.Text
              numberOfLines={1}
            >
              {item.notes}
            </Components.Text>
          </View>
          <TouchableOpacity
            style={styles.heart}
            onPress={() => { this.toggleIsFavorite(item.id, !item.isFavorite) }}
          >
            <FontAwesome
              color={COLOR.darkCyan}
              name={item.isFavorite ? 'heart' : 'heart-o'}
              size={20}
            />
          </TouchableOpacity>
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
          rightPanel={(
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.navigationTouchable}
              onPress={() => { this.props.navigation.navigate('CreateItemForm')}}
            >
              <FontAwesome5
                color={COLOR.lighterCyan}
                name="plus"
                size={20}
              />
            </TouchableOpacity>
          )}
        />
        <FlatList
          contentContainerStyle={styles.list}
          data={this.props.items}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
          renderItem={this.renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Components.Text>
                No items yet. Create one!
              </Components.Text>
            </View>
          }
        />
      </View>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    items: state.auth.isAuthenticated ? state.item.itemIds.map(id => state.item.items[id])
      : Object.keys(state.item.offlineItems).map(id => state.item.offlineItems[id]),
  }
}

export default connect(mapStateToProps)(ItemList);