import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Text, Header, Tab, Tabs, ScrollableTab, Right, Button, Icon } from 'native-base';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Post from './Post.js'
import Category from './Category.js'
import NewCategory from './NewCategory.js'

class Discover extends Component {
  addNewComment(postId, comment, parentId, topLevel) {
    const currentCategoryName = this.getCategoryName(this.state.currentCategory);
    const currentPost = Object.assign({}, this.state.categories[currentCategoryName][postId]);

    const currentCommentsKeys = Object.keys(currentPost.comments);
    const nextKey = parseInt(currentCommentsKeys[currentCommentsKeys.length - 1]) + 1;
    currentPost.comments[nextKey.toString()] = comment;
    if (topLevel) {
      currentPost.topLevelCommentIds.push(nextKey);
    } else {
      currentPost.comments[parentId].replies.push(nextKey);
    }
    this.state.categories[currentCategoryName][postId] = currentPost;

    Actions.postWithComments(
      {
        post: currentPost,
        topLevelCommentIds: currentPost.topLevelCommentIds,
        addLike: this.addLike.bind(this),
        id: postId,
        addNewComment: this.addNewComment.bind(this),
      }
    )
    this.setState({ categories: this.state.categories });
  }

  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    const { user, createCategory, categories, currentCategory, changeCategory, createPost } = this.props;
    
    return (
      <Container>
        <Header hasTabs>
          <Image
            style={{
              alignSelf: 'center',
              height: 100,
              width: '80%',
              marginTop: 50,
              marginBottom: 30,
            }}
            source={require('../../../images/nurse-logo.png')}
            resizeMode="contain"
          />
          <Right style={{ paddingTop: 15 }}>
            <Button transparent onPress={() => Actions.newPost({ onFormSubmit: createPost, categoryId: currentCategory, user })}>
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Tabs renderTabBar={()=> <ScrollableTab />} onChangeTab={({ i }) => changeCategory(Object.keys(categories)[i])}>
          {
            Object.keys(categories).map((categoryId) => {
              const category = categories[categoryId];
              
              return (
                <Tab heading={category.name} key={categoryId}>
                  <Category categoryId={categoryId} />
                </Tab>
              )
            })
          }
          <Tab heading="+New Category">
            <NewCategory onFormSubmit={createCategory} user={user} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  currentCategory: state.categories.currentCategory,
  posts: state.posts.posts,
  user: state.member
});

const mapDispatchToProps = dispatch => ({
  getCategories: dispatch.categories.getCategories,
  getPosts: dispatch.posts.getPosts,
  createPost: dispatch.posts.createPost,
  createCategory: dispatch.categories.createCategory,
  changeCategory: dispatch.categories.changeCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
