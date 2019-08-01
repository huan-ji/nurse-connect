import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View,
} from 'native-base';

import LikeIcon from './LikeIcon'
import CommentIcon from './CommentIcon'
import { Actions } from 'react-native-router-flux';

class Post extends Component {
  render() {
    const { id, imageUrl, title, text, author, specialty, avatarUrl, likeCount, addLike, commentCount, topLevelCommentIds, post, details, addComment } = this.props
    
    return (
      <Content padder>
        <Card>
          <CardItem>
            <Left>
              { avatarUrl && <Thumbnail source={{ uri: avatarUrl }} /> }
              <Body>
                <Text>{ author }</Text>
                <Text note>{ specialty }</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Content padder><Text>{ text }</Text></Content>
          </CardItem>
          {
            imageUrl ? 
              <CardItem cardBody>
                <Image source={{ uri: imageUrl }} style={{ height: 200, width: null, flex: 1 }} />
              </CardItem> : undefined
          }
          <CardItem>
            <Left>
              <Button transparent onPress={() => {
                  if (details) {
                    Actions.addComment({ postId: id, parentId: id, topLevelComment: true, postTitle: title, onFormSubmit: addComment })
                  } else {
                    Actions.postWithComments({ post, topLevelCommentIds, addLike, id, addNewComment });
                  }
                }
              }>
                <CommentIcon count={commentCount} />
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={() => addLike(id)}>
                <LikeIcon count={likeCount} />
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    )
  }
}

export default Post;
