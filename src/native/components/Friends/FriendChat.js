import React from 'react';
import {
  Container, Content, Header, Left, Body, Right, Icon, Button, Text,
} from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import { Actions } from 'react-native-router-flux';

class FriendChat extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    Actions.refresh({ title: this.props.friend });
    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hey what's up I'm ${this.props.friend}`,
          createdAt: new Date() - 99393029,
          user: {
            _id: 2,
            name: this.props.friend,
            avatar: require('../../../images/default-avatar.png'),
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text>{this.props.friend}</Text>
          </Body>
          <Right />
        </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </Container>
    );
  }
}

export default FriendChat;
