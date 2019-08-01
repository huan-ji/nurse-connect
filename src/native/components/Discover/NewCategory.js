import React from 'react';
import {
  Container, Content, Text, Form, Item, Label, Input, Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Spacer from '../UI/Spacer';

class NewCategory extends React.Component {
  state = {
    name: '',
    userId: this.props.user.uid,
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => this.setState({ [name]: val })

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state);
  }

  render() {
    const { loading } = this.props;

    return (
      <Container>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>Category Name</Label>
              <Input
                disabled={loading}
                onChangeText={v => this.handleChange('name', v)}
              />
            </Item>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit} disabled={loading}>
              <Text>{loading ? 'Loading' : 'Submit Category'}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default NewCategory;
