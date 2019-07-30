import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Form, Item, Label, Input, Button, Textarea,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from '../UI/Messages';
import Spacer from '../UI/Spacer';

class NewPost extends React.Component {
  state = {
    title: undefined,
    text: undefined,
    imageUrl: undefined,
    author: 'kkiiji14',
    specialty: 'Travel Nurse',
    comments: {},
    topLevelCommentIds: [],
    likes: 0,
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
    Actions.pop();
    // .then(() => setTimeout(() => { Actions.home(); }, 1000))
    // .catch(() => {});
  }

  render() {
    const { loading, error, success } = this.props;

    return (
      <Container>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>Title</Label>
              <Input
                disabled={loading}
                onChangeText={v => this.handleChange('title', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Image</Label>
              <Input
                autoCapitalize="none"
                disabled={loading}
                onChangeText={v => this.handleChange('imageUrl', v)}
              />
            </Item>

            <Textarea
              rowSpan={8}
              bordered
              placeholder="Post text"
              disabled={loading}
              onChangeText={v => this.handleChange('text', v)}
              style={{ marginLeft: 10, marginTop: 20 }}
            />

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit} disabled={loading}>
              <Text>{loading ? 'Loading' : 'Submit Post'}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default NewPost;
