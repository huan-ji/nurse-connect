import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Header, Tab, Tabs, ScrollableTab, Right, Button, Icon,
} from 'native-base';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Category from './Category.js';
import NewCategory from './NewCategory.js';

class Discover extends Component {
  componentWillMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  render() {
    const {
      user, createCategory, categories, currentCategory, changeCategory, createPost
    } = this.props;

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
            <Button
              transparent
              onPress={() => Actions.newPost({
                onFormSubmit: createPost, categoryId: currentCategory, user,
              })}
            >
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Tabs
          renderTabBar={() => <ScrollableTab />}
          onChangeTab={({ i }) => changeCategory(Object.keys(categories)[i])}
        >
          {
            Object.keys(categories).map((categoryId) => {
              const category = categories[categoryId];

              return (
                <Tab heading={category.name} key={categoryId}>
                  <Category categoryId={categoryId} />
                </Tab>
              );
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
  user: state.member,
});

const mapDispatchToProps = dispatch => ({
  getCategories: dispatch.categories.getCategories,
  getPosts: dispatch.posts.getPosts,
  createPost: dispatch.posts.createPost,
  createCategory: dispatch.categories.createCategory,
  changeCategory: dispatch.categories.changeCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
