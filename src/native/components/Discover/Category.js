import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Text } from 'native-base';
import Post from './Post.js'

class Category extends Component {
  componentWillMount() {
    const { categoryId, getPosts } = this.props;
    getPosts(categoryId);
  }
  
  render() {
    const { posts, addComment, addLike } = this.props;
    
    return (
      <Content>
        {Object.keys(posts).map((id) => {
          const post = posts[id];

          return (
            <Post
              key={id}
              id={id}
              post={post}
              addComment={addComment}
              addLike={addLike}
              {...post}
            />
          );
        })}
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts || {},
});

const mapDispatchToProps = dispatch => ({
  getPosts: dispatch.posts.getPosts,
  createPost: dispatch.posts.createPost,
  addLike: dispatch.posts.createLike,
  addComment: dispatch.comments.createComment,
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);