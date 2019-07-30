import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View, Header,
} from 'native-base';

import { Actions } from 'react-native-router-flux';

class FriendList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: ['Nurse1000', 'Nurse2000', 'Nurse3000', 'kkiiji'],
    };
  }

  render() {
    const { friends } = this.state;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Text style={{ fontSize: 20 }}>Friends</Text>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            {friends.map(friend => (
              <CardItem key={friend}>
                <Button transparent onPress={() => Actions.friendChat({ friend, title: friend })}>
                  <Thumbnail source={require('../../../images/default-avatar.png')} />
                  <Text>{friend}</Text>
                </Button>
              </CardItem>
            ))}
          </Card>
        </Content>
      </Container>
    );
  }
}

export default FriendList;
