import React, { Component } from 'react';
import { Container, Text, Header, Tab, Tabs, ScrollableTab, Right, Button, Icon } from 'native-base';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Post from './Discover/Post.js'
import Category from './Discover/Category.js'

export default class Discover extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentCategory: 0,
      categories: {
        'Nursing': {
          '1': {
            title: 'Being a nurse is dope!',
            text: 'Being a nurse is super dope, it might be tough but I love going to work everyday. Blah blah blhab lhllsakdlk kdksk',
            author: 'Nurse1000',
            specialty: 'Travel nurse',
            imageUrl: 'https://thenerdynurse.com/wp-content/uploads/2018/04/designer-bags.jpg',
            likes: 60,
            topLevelCommentIds: ['1', '2'],
            comments: {
              '1': {
                text: "That's so true!",
                postId: '1',
                author: 'kkiiji14',
                replies: ['3', '4']
              },
              '2': {
                text: "That's very true!",
                postId: '1',
                author: 'Nurse2000',
                replies: []
              },
              '3': {
                text: "I'm not sure I agree",
                postId: '1',
                author: 'Nurse3000',
                replies: []
              },
              '4': {
                text: "Yeah I don't know about that",
                postId: '1',
                author: 'kkiiji',
                replies: ['5']
              },
              '5': {
                text: "Well you're wrong",
                postId: '1',
                author: 'kkiiji14',
                replies: []
              }
            }
          }
        },
        'Fun': {
          '1': {
            title: 'I am so done with work',
            text: 'Can we blow off some steam please? I have some ideas on events we can do, anyone down?',
            author: 'Nurse3000',
            specialty: 'Travel nurse',
            imageUrl: 'https://pbs.twimg.com/media/B0vkRBlIMAEUaiA.jpg',
            likes: 10,
            topLevelCommentIds: ['1', '2'],
            comments: {
              '1': {
                text: "So down!!!!",
                postId: '1',
                author: 'kkiiji14',
                replies: ['3', '4']
              },
              '2': {
                text: "It's not that bad...",
                postId: '1',
                author: 'Nurse2000',
                replies: []
              },
              '3': {
                text: "LEZZZ GOOOO",
                postId: '1',
                author: 'Nurse3000',
                replies: []
              },
              '4': {
                text: "You slacker, get back to work",
                postId: '1',
                author: 'kkiiji',
                replies: []
              }
            }
          }
        },
        'Newbie': {
          '1': {
            title: 'Hey guys newbie here',
            text: 'I am super new as a nurse can yall help me figure this whole thing out? Very tough job',
            author: 'kkiiji',
            specialty: 'Travel nurse',
            imageUrl: 'https://media.makeameme.org/created/wrong-bad.jpg',
            likes: 5,
            topLevelCommentIds: ['1', '2'],
            comments: {
              '1': {
                text: "I'm new too",
                postId: '1',
                author: 'kkiiji14',
                replies: []
              },
              '2': {
                text: "Me too",
                postId: '1',
                author: 'Nurse2000',
                replies: []
              },
            }
          }
        },
        'Random': {

        },
        'Events': {

        },
      },
    }

    this.addNewPost = this.addNewPost.bind(this);
  }

  getCategoryName(i) {
    return Object.keys(this.state.categories)[i];
  }

  addNewPost(post) {
    const currentCategoryName = this.getCategoryName(this.state.currentCategory);
    const currentCategory = Object.assign({}, this.state.categories[currentCategoryName]);
    const currentCategoryKeys = Object.keys(currentCategory);
    const nextKey = parseInt(currentCategoryKeys[currentCategoryKeys.length - 1]) + 1;
    currentCategory[nextKey.toString()] = post;
    this.state.categories[currentCategoryName] = currentCategory;

    this.setState({ categories: this.state.categories });
  }

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

  addLike(id, category) {
    const newCategories = Object.assign({}, this.state.categories)
    newCategories[category][id].likes += 1

    this.setState({ categories: newCategories })
  }

  render() {
    const { categories } = this.state

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
            source={require('../../images/nurse-logo.png')}
            resizeMode="contain"
          />
          <Right style={{ paddingTop: 15 }}>
            <Button transparent onPress={() => Actions.newPost({ onFormSubmit: this.addNewPost })}>
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Tabs renderTabBar={()=> <ScrollableTab />} onChangeTab={({ i }) => this.setState({ currentCategory: i })}>
          {
            Object.keys(categories).map((category) => {
              const posts = categories[category]

              return (
                <Tab heading={category} key={category}>
                  <Category posts={posts} addNewComment={(...args) => this.addNewComment(...args)} addLike={(id) => this.addLike(id, category)} />
                </Tab>
              )
            })
          }
        </Tabs>
      </Container>
    );
  }
}
