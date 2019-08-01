import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Container, Content, Text, Form, Button, Textarea,
} from 'native-base';
import Spacer from '../UI/Spacer';

class NewComment extends React.Component {
  constructor(props) {
    super(props);

    const { postId, parentId, topLevelComment } = this.props;
    this.state = {
      text: '',
      postId,
      parentId,
      topLevelComment,
      replies: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => this.setState({ [name]: val })

  handleSubmit = () => {
    const { onFormSubmit, postId, parentId } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.pop());
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
