import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import { Item } from 'models/item';
import ItemServiceClient from 'clients/itemService';
import { StackNavigationProp } from '@react-navigation/stack';
import { ItemStackParamList } from 'navigatorTypes';
import { FontAwesome5 } from '@expo/vector-icons';
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
  navigationTouchable: {
    padding: '0.375rem',
  },
  name: {
    fontWeight: '600',
    fontSize: '1.5rem',
    marginBottom: '0.625rem',
  },
  mainInfo: {
    flexDirection: 'row',
  },
  description: {
    flex: 1,
    marginRight: '1rem',
  },
  thumbnail: {
    width: 150,
    height: 150,
    marginLeft: 'auto',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  mapMarker: {
    marginRight: '0.5rem'
  },
  smallDetail: {
    fontStyle: 'italic',
    flexWrap: 'wrap',
    flex: 1,
    fontSize: '0.75rem',
  }
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
          rightPanel={(
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.navigationTouchable}
                onPress={() => { this.props.navigation.navigate('EditItemForm', { id: this.props.route.params.id })}}
              >
                <FontAwesome5
                  color={COLOR.lighterCyan}
                  name="edit"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.navigationTouchable}
              >
                <FontAwesome5
                  color={COLOR.lighterCyan}
                  name="angle-double-right"
                  size={20}
                />
              </TouchableOpacity>
            </>
          )}
        />
        <Components.MainContainer>
          {item && (
            <View style={styles.mainInfo}>
              <View style={styles.description}>
                <Components.Text style={styles.name}>
                  {item.name}
                </Components.Text>
                <View style={styles.location}>
                  <Components.Text style={styles.smallDetail}>
                    {item.createdAt && new Date(item.createdAt).toUTCString()}
                  </Components.Text>
                </View>
                {item.position && (
                  <View style={styles.location}>
                    <FontAwesome5
                      color={COLOR.darkCyan}
                      name="map-marker-alt"
                      size={15}
                      style={styles.mapMarker}
                    />
                    <Components.Text>
                      {item.position.name}
                    </Components.Text>
                  </View>
                )}
                <Components.Text>
                  {item.notes}
                </Components.Text>
              </View>
              <Image
                style={styles.thumbnail}
                source={{ uri: 'https://place-hold.it/150x150' }}
              />
            </View>
          )}
        </Components.MainContainer>
      </View>
    );
  }
}

export default ItemView;