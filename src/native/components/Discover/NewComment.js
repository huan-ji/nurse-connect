import React from 'react';
import {
  Container, Content, Text, Form, Item, Label, Input, Button, Textarea,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Spacer from '../UI/Spacer';

class NewComment extends React.Component {
  state = {
    text: '',
    author: 'kkiiji14',
    specialty: 'Travel Nurse',
    postId: this.props.postId,
    replies: [],
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => this.setState({ [name]: val })

  handleSubmit = () => {
    const { onFormSubmit, postId, parentId, topLevelComment } = this.props;
    onFormSubmit(postId, this.state, parentId, topLevelComment);
    // .then(() => setTimeout(() => { Actions.home(); }, 1000))
    // .catch(() => {});
  }

  render() {
    const { loading, error, success, postTitle } = this.props;

    return (
      <Container>
        <Content padder>
          <Text>{postTitle}</Text>
          <Form>
            <Textarea
              rowSpan={8}
              bordered
              placeholder="Comment text"
              disabled={loading}
              onChangeText={v => this.handleChange('text', v)}
              style={{ marginLeft: 10, marginTop: 20 }}
            />

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit} disabled={loading}>
              <Text>{loading ? 'Loading' : 'Submit Comment'}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default NewComment;
