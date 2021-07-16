import React from 'react';
import { ScrollView, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import ItemServiceClient from 'clients/itemService';
import { StackNavigationProp } from '@react-navigation/stack';
import { ItemStackParamList } from 'navigatorTypes';
import { RouteProp } from '@react-navigation/native';

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
        </Components.MainContainer>
      </ScrollView>
    );
  }
}

export default EditItemForm;