import React from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import ItemServiceClient from 'clients/itemService';
import { StackNavigationProp } from '@react-navigation/stack';
import { ItemStackParamList } from 'navigatorTypes';
import { RouteProp } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

interface EditItemProps {
  navigation: StackNavigationProp<ItemStackParamList, 'EditItemForm'>;
  route: RouteProp<ItemStackParamList, 'EditItemForm'>;
}

interface EditItemState {
  form: {
    name: string;
    notes: string;
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightCyan,
  },
  thumbnail: {
    alignSelf: 'center',
    marginBottom: '1rem',
    width: 150,
    height: 150,
  },
  button: {
    height: '3.25rem',
    width: '50%',
    alignSelf: 'center',
    margin: '1rem',
  },
  buttonText: {
    fontSize: '1rem',
  },
  navigationTouchable: {
    padding: '0.375rem',
  },
});

class EditItemForm extends React.Component<EditItemProps, EditItemState> {
  constructor(props: EditItemProps) {
    super(props);

    this.state = {
      form: {
        name: '',
        notes: '',
      }
    }
  }

  async componentDidMount() {
    const client = new ItemServiceClient();
    const item = await client.getItem(this.props.route.params.id);
    this.setState({ 
      form: {
        name: item.name,
        notes: item.notes,
      },
    });
  }

  save = async () => {
    try {
      const client = new ItemServiceClient();
      await client.updateItem(this.props.route.params.id, this.state.form);
      this.props.navigation.goBack();
    } catch(e) {
      console.log(e);
    }
  }

  delete = async () => {
    try {
      const client = new ItemServiceClient();
      await client.deleteItem(this.props.route.params.id);
      this.props.navigation.goBack();
    } catch(e) {
      console.log(e);
    }
  }

  onChange = (field: string, value: string): void => {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [field]: value,
      },
    }));
  }

  render(): React.ReactNode {
    const { form } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Components.NavigationBar
          icon="times"
          callback={this.props.navigation.goBack}
          rightPanel={(
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.navigationTouchable}
              onPress={this.delete}
            >
              <FontAwesome5
                color={COLOR.lighterCyan}
                name="trash-alt"
                size={20}
              />
            </TouchableOpacity>
          )}
        />
        <Components.MainContainer>
          <Image
            style={styles.thumbnail}
            source={{ uri: 'https://place-hold.it/150x150' }}
          />
          <Components.Textbox
            fieldName="Item Name"
            isRequired
            onChangeText={(value) => { this.onChange('name', value); }}
            value={form.name}
          />
          <Components.Textbox
            fieldName="Item Notes"
            multiline
            numberOfLines={3}
            onChangeText={(value) => { this.onChange('notes', value); }}
            placeholder="Describe item here"
            value={form.notes}
          />
          <Components.Button
            style={styles.button}
            onPress={this.save}
            textStyle={styles.buttonText}
          >
            Save
          </Components.Button>
        </Components.MainContainer>
      </ScrollView>
    );
  }
}

export default EditItemForm;