import React from 'react';
import { ScrollView, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import ItemServiceClient from 'clients/itemService';
import { StackNavigationProp } from '@react-navigation/stack';
import { ItemStackParamList } from 'navigatorTypes';

interface CreateItemProps {
  navigation: StackNavigationProp<ItemStackParamList, 'CreateItemForm'>;
}

interface CreateItemState {
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
});

class NewItemForm extends React.Component<CreateItemProps, CreateItemState> {
  constructor(props: CreateItemProps) {
    super(props);

    this.state = {
      form: {
        name: '',
        notes: '',
      }
    }
  }

  save = async () => {
    try {
      const client = new ItemServiceClient();
      await client.createItem(this.state.form);
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
          title="New Item"
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

export default NewItemForm;