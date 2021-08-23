import React from 'react';
import { ScrollView, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Components from 'components';
import COLOR from 'constants/color';
import { StackNavigationProp } from '@react-navigation/stack';
import { ItemStackParamList } from 'navigatorTypes';
import { connect } from 'react-redux';
import { createItem, createOfflineItem } from 'reduxActions/item/itemReducer';
import { AppDispatch }  from 'reduxActions/store';
import { RootState } from 'reduxActions/store';

interface CreateItemProps {
  dispatch: AppDispatch;
  navigation: StackNavigationProp<ItemStackParamList, 'CreateItemForm'>;
  isAuthenticated: boolean;
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
      if (this.props.isAuthenticated) {
        await this.props.dispatch(createItem(this.state.form)).unwrap();
      } else {
        this.props.dispatch(createOfflineItem(this.state.form));
      }
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

function mapStateToProps(state: RootState) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(NewItemForm);